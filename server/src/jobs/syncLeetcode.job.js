const cron = require("node-cron");
const userModel = require("../models/user.model");
const { getUserSolved } = require("../services/leetcode.service");
const { awardXP } = require("../services/xp.service");

async function startLeetcodeSync() {
  cron.schedule("0 */6 * * * ", async () => {
    try {
      let pages = 0;
      const batchSize = 100;
      while (true) {
        const users = await userModel
          .find({ leetcodeUsername: { $ne: null } })
          .skip(pages * batchSize)
          .limit(batchSize);
        if (users.length === 0) break;
        for (const user of users) {
          try {
            const fetched = await getUserSolved(user.leetcodeUsername);
            let hasNewSolve = false;
            if (fetched.easy > user.leetcodeSolved.easy) {
              const newEasy = fetched.easy - user.leetcodeSolved.easy;
              user.leetcodeSolved.easy = fetched.easy;
              hasNewSolve = true;
              for (let i = 0; i < newEasy; i++) {
                await awardXP(user._id, "leetcode", "solve_easy", {});
              }
              
            }
            if (fetched.medium > user.leetcodeSolved.medium) {
              const newMedium = fetched.medium - user.leetcodeSolved.medium;
              user.leetcodeSolved.medium = fetched.medium;
               hasNewSolve = true;
              for (let i = 0; i < newMedium; i++) {
                await awardXP(
                  user._id,
                  "leetcode",
                  "solve_medium",
                  {},
                );
              }
              
            }
            if (fetched.hard > user.leetcodeSolved.hard) {
              const newHard = fetched.hard - user.leetcodeSolved.hard;
               hasNewSolve = true;
              user.leetcodeSolved.hard = fetched.hard;
              for (let i = 0; i < newHard; i++) {
                await awardXP(
                  user._id,
                  "leetcode",
                  "solve_hard",
                  {},
                );
              }
              
            }
            await userModel.findByIdAndUpdate(user._id, {
              "leetcodeSolved.easy": fetched.easy,
              "leetcodeSolved.medium": fetched.medium,
              "leetcodeSolved.hard": fetched.hard,
              ...(hasNewSolve && {lastSolvedDate: new Date()}),
            });
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (error) {
            console.error(
              `Failed to sync ${user.leetcodeUsername}:`,
              error.message,
            );
            continue;
          }
        }

        pages++;
      }
    } catch (error) {
      console.error("Failed to sync Leetcode data:", error.message);
      throw error;
    }
  });
}

module.exports = { startLeetcodeSync };
