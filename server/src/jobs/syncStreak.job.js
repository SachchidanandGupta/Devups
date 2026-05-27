const cron = require("node-cron");
const userModel = require("../models/user.model");
const { awardXP } = require("../services/xp.service");

function isSameDate(date1, date2) {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

function isYesterdaySolved(date) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return isSameDate(date, yesterday);
}

function startStreakSync() {
  cron.schedule("0 0 * * *", async () => {
    try {
      const today = new Date();
      const batchSize = 100;
      let page = 0;
      let processedUser = 0;
      while (true) {
        const users = await userModel
          .find({ lastSolvedDate: { $ne: null } })
          .skip(page * batchSize)
          .limit(batchSize);

        if (users.length == 0) break;

        for (const user of users) {
          const lastSolvedDate = user.lastSolvedDate;
          if (isSameDate(lastSolvedDate, today)) {
            const newStreak = (user.streak || 0) + 1;
            if (newStreak > (user.maxStreak || 0)) {
              user.maxStreak = newStreak;
            }
            user.streak = newStreak;
            await user.save();
            await awardXP(user._id, "streak", "daily_streak", {
              streak: newStreak,
            });
          } else if (isYesterdaySolved(lastSolvedDate)) {
            continue;
          } else {
            if (user.streak !== 0) {
              user.streak = 0;
              await user.save();
            }
          }
          processedUser++;
        }
        page++;
      }
    } catch (err) {
      console.log("Failed to sync streak", err);
    }
  });
}

module.exports = { startStreakSync };
