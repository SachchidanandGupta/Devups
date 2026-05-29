const cron = require("node-cron");
const userModel = require("../models/user.model");
const { awardXP } = require("../services/xp.service");
const axios = require("axios");

async function getCodeforcesData(username) {
  const response = await axios.get(
    `https://codeforces.com/api/user.status?handle=${username}&from=1&count=1000`,
  );
  return response.data.result;
}

async function startCodeforcesSync() {
  cron.schedule(" 0 */6 * * *", async () => {
    try {
      let pages = 0;
      const batchSize = 100;
      while (true) {
        const users = await userModel
          .find({ codeforcesHandle: { $ne: null } })
          .skip(pages * batchSize)
          .limit(batchSize);
        if (users.length === 0) break;
        for (const user of users) {
          try {
            const submissions = await getCodeforcesData(user.codeforcesHandle);
            const accepted = submissions.filter((s) => s.verdict === "OK");
            const lastSync = user.lastSolvedDate
              ? user.lastSolvedDate.getTime() / 1000
              : 0;
            const newAccepted = accepted.filter(
              (s) => s.creationTime > lastSync,
            );
            const seen = new Set();
            const uniqueNew = newAccepted.filter((s) => {
              if (seen.has(s.problem.name)) return false;
              seen.add(s.problem.name);
              return true;
            });
            let hasNewSolve = false;
            for (const submission of uniqueNew) {
              const rating = submission.problem.rating;
              let action;
              if (!rating || rating < 1200) action = "solve_easy";
              else if (rating < 1900) action = "solve_medium";
              else action = "solve_hard";

              await awardXP(user._id, "codeforces", action, {});
              hasNewSolve = true;
            }
            if (hasNewSolve) {
              await userModel.findByIdAndUpdate(
                user._id,
                {
                  lastSolvedDate: new Date(),
                },
                { returnDocument: "after", runValidators: true },
              );
            }
          } catch (error) {
            console.error(
              `Failed to sync ${user.codeforcesHandle}:`,
              error.message,
            );
            continue;
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        pages++;
      }
    } catch (error) {
        console.error("Failed to sync codeforces data:", error.message);
      throw error;
    }
  });
}

module.exports = {startCodeforcesSync};
