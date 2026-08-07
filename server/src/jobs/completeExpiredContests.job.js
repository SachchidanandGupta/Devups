const cron = require("node-cron");
const contestModel = require("../models/contest.model");
const { determineWinner } = require("../services/contest.service");
const { awardContestXp } = require("../services/xp.service");
const { createActivityLog } = require("../services/activityLog.service");

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

            if (winnerId) {
              const winnerEntry = contest.scores.find(
                (s) => String(s.userId) === String(winnerId),
              );
              await createActivityLog({
                userId: winnerId,
                type: "contest_ranked",
                platform: "devups",
                message: `won the contest ${contest.contestName}`,
                contestId: contest._id,
                metaData: {
                  xpEarned: winnerEntry?.xpEarned || 0,
                  solvedCount: winnerEntry?.solvedCount || 0,
                },
              });
            }

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
async function startActiveContestSync() {
  cron.schedule("* * * * *", async () => {
    try {
      const contests = await contestModel.find({
        status: "pending",
        startTime: { $lte: new Date() },
      });

      if (!contests.length) return;

      await contestModel.updateMany(
        {
          _id: { $in: contests.map((c) => c._id) },
        },
        {
          $set: { status: "active" },
        },
      );
      console.log(`Activated ${contests.length} contests`);
    } catch (err) {
      console.error(err);
    }
  });
}
module.exports = {
  startContestSync,
  startActiveContestSync,
};
