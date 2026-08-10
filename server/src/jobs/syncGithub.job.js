const cron = require("node-cron");
const userModel = require("../models/user.model");
const { awardBatchedXP } = require("../services/xp.service");
const { getGithubContributionStats } = require("../services/github.service");

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
            const stats = await getGithubContributionStats(user.githubUsername);
            const newCommits = Math.max(
              0,
              stats.totalCommitContributions - user.githubSynced.commits,
            );
            const newPRs = Math.max(
              0,
              stats.totalPullRequestContributions - user.githubSynced.pullRequests,
            );

            if (newCommits > 0) {
              await awardBatchedXP(user._id, "github", "github_commit", newCommits);
            }
            if (newPRs > 0) {
              await awardBatchedXP(user._id, "github", "github_pr", newPRs);
            }

            await userModel.findByIdAndUpdate(user._id, {
              "githubSynced.commits": stats.totalCommitContributions,
              "githubSynced.pullRequests": stats.totalPullRequestContributions,
            });
          } catch (error) {
            console.error(`failed to sync ${user.githubUsername}`, error.message);
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