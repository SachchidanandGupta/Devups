const cron = require("node-cron");
const axios = require("axios");
const userModel = require("../models/user.model");
const { awardXP } = require("../services/xp.service");
const { createActivityLog } = require("../services/activityLog.service");

const AMAZING_RATING_JUMP = 180;

async function getCodeforcesRatingHistory(handle) {
  const response = await axios.get(
    `https://codeforces.com/api/user.rating?handle=${handle}`,
  );
  return response.data.result;
}

async function startCodeforcesRatingSync() {
  cron.schedule("0 3 * * *", async () => {
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
            const history = await getCodeforcesRatingHistory(user.codeforcesHandle);
            const lastContestId = user.codeforcesSynced.lastContestId || 0;
            const newEntries = history
              .filter((entry) => entry.contestId > lastContestId)
              .sort((a, b) => a.contestId - b.contestId);

            let latestContestId = lastContestId;
            let latestRating = user.codeforcesSynced.rating;

            for (const entry of newEntries) {
              if (entry.rank <= 10) {
                await awardXP(user._id, "codeforces", "contest_top10", {
                  contestId: entry.contestId,
                  contestName: entry.contestName,
                  rank: entry.rank,
                });
              } else if (entry.rank <= 25) {
                await awardXP(user._id, "codeforces", "contest_top25", {
                  contestId: entry.contestId,
                  contestName: entry.contestName,
                  rank: entry.rank,
                });
              }

              const ratingDelta = entry.newRating - entry.oldRating;
              if (ratingDelta >= AMAZING_RATING_JUMP) {
                await awardXP(user._id, "codeforces", "codeforces_amazing_rank", {
                  contestId: entry.contestId,
                  contestName: entry.contestName,
                  ratingDelta,
                });
                await createActivityLog({
                  userId: user._id,
                  type: "amazing_rank",
                  platform: "codeforces",
                  message: `${user.codeforcesHandle} jumped +${ratingDelta} rating in ${entry.contestName}`,
                  metaData: {
                    contestId: entry.contestId,
                    contestName: entry.contestName,
                    oldRating: entry.oldRating,
                    newRating: entry.newRating,
                    rank: entry.rank,
                  },
                });
              }

              latestContestId = entry.contestId;
              latestRating = entry.newRating;
            }

            if (newEntries.length > 0) {
              await userModel.findByIdAndUpdate(user._id, {
                "codeforcesSynced.lastContestId": latestContestId,
                "codeforcesSynced.rating": latestRating,
              });
            }
          } catch (error) {
            console.error(
              `Failed to sync rating for ${user.codeforcesHandle}:`,
              error.message,
            );
            continue;
          }
          await new Promise((resolve) => setTimeout(resolve, 500));
        }
        pages++;
      }
    } catch (error) {
      console.error("Failed to sync Codeforces rating data:", error.message);
      throw error;
    }
  });
}

module.exports = { startCodeforcesRatingSync };