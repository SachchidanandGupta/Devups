const cron = require("node-cron");
const userModel = require("../models/user.model");
const { awardXP } = require("../services/xp.service");
const axios = require("axios");

async function getGithub(username) {
  const response = await axios.get(
    `https://api.github.com/users/${username}/events/public?per_page=100`,
    {
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        Accept: "application/vnd.github+json",
      },
    },
  );
  return response.data;
}
async function startGithubSync() {
  cron.schedule("0 */6 * * *", async function () {
    try {
      let pages = 0;
      const batchSize = 100;
      while (true) {
        const users = await userModel
          .find({ githubUsername: { $ne: null } })
          .skip(pages * batchSize)
          .limit(batchSize);
        if (users.length === 0) break;
        for (const user of users) {
          try {
            const event = await getGithub(user.githubUsername);
            const newEvent = event.filter(
              (e) => new Date(e.created_at) > user.lastSolvedDate,
            );
            let hasNewSolve;
            for (const e of newEvent) {
              if (e.type === "PushEvent") {
                const commits = e.payload.commits || [];
                for (const commit of commits) {
                  await awardXP(user._id, "github", "github_commit", {});
                  hasNewSolve = true;
                }
              } else if (e.type === "PullRequestEvent") {
                if (
                  e.payload.action === "closed" &&
                  e.payload.pull_request?.merged === true
                ) {
                  await awardXP(user._id, "github", "github_pr", {});
                  hasNewSolve = true;
                }
              }
            }
            if (hasNewSolve) {
              await userModel.findByIdAndUpdate(
                user._id,
                { lastSolvedDate: new Date() },
                { returnDocument: "after", runValidators: true },
              );
            }
          } catch (error) {
            console.error(`failed to sync ${user.githubUsername}`);
            continue;
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        pages++;
      }
    } catch (error) {
      console.error("Failed to sync Github data:", error.message);
      throw error;
    }
  });
}

module.exports = { startGithubSync };
