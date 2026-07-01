const cron = require("node-cron");
const contestModel = require("../models/contest.model");
const { determineWinner } = require("../services/contest.service");
const { awardContestXp } = require("../services/xp.service");
async function startContestSync() {
  cron.schedule("*/15 * * * * ", async () => {
    try {
      let pages = 0;
      let batchSize = 100;
      while (true) {
        const contests = await contestModel
          .find({ status: "active", endTime: { $lt: new Date() } })
          .skip(pages * batchSize)
          .limit(batchSize);
        if (contests.length === 0) break;
        for (const contest of contests) {
          try {
            const winnerId = determineWinner(contest);
            await contestModel.findByIdAndUpdate(contest._id, {
              winner: winnerId,
              status: "completed",
            });
            await Promise.all(
              contest.scores
                .filter((c) => c.xpEarned > 0)
                .map((c) => awardContestXp(c.userId, c.xpEarned)),
            );
            await new Promise((resolve) => setTimeout(resolve, 500));
          } catch (error) {
            console.error(
              `Failed concluding contest ${contest.contestName}`,
              error.message,
            );
            continue;
          }
        }
        pages++;
      }
    } catch (error) {
      console.error("Failed to sync contest data:", error.message);
      throw error;
    }
  });
}

module.exports = {
  startContestSync,
};
