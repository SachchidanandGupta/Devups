const cron = require("node-cron");
const contestModel = require("../models/contest.model");
const {  finalizeContest } = require("../services/contest.service");
const { createActivityLog } = require("../services/activityLog.service");

async function startContestSync() {
  cron.schedule("*/15 * * * *", async () => {
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
            await finalizeContest(contest._id);
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
