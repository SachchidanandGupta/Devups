const XP_VALUES = {
  solve_easy: 5,
  solve_medium: 15,
  solve_hard: 35,
  contest_participation: 10,
  contest_top25: 25,
  contest_top10: 50,
  github_commit: 2,
  github_pr: 10,
  daily_streak: 5,
};

const xpEventModel = require("../models/xpEvent.model");
const userModel = require("../models/user.model");
const { emitXPUpdate } = require("./socket.service");

function resolveLevelData(xp) {
  let level = 1;
  let cost = 100;
  let threshold = 0;
  while (xp >= threshold + cost) {
    threshold += cost;
    cost = Math.floor(cost * 1.1);
    level++;
  }
  return {
    level,
    threshold,
    cost,
  };
}

function calculateLevel(xp) {
  return resolveLevelData(xp).level;
}

function getLevelProgress(xp) {
  const { level, threshold, cost } = resolveLevelData(xp);
  return {
    level,
    currentXP: xp - threshold,
    requiredXP: cost,
  };
}
async function awardXP(userId, source, action, metaData = {}) {
  const amount = XP_VALUES[action];
  if (!amount) {
    throw new Error("InValid action" + action);
  }

  const xpEvent = await xpEventModel.create({
    userId,
    action,
    source,
    amount,
    metaData,
  });

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { $inc: { xp: amount } },
    { returnDocument: "after" },
  );

  const { level, currentXP, requiredXP } = getLevelProgress(updatedUser.xp);
  if (level !== updatedUser.level) {
    await userModel.findByIdAndUpdate(userId, { level: level });
    updatedUser.level = level;
  }

  emitXPUpdate(userId, {
    xp: updatedUser.xp,
    level: updatedUser.level,
    action,
    amount,
    currentXP,
    requiredXP,
  });
  return {
    xpEvent,
    user: {
      id: updatedUser._id,
      xp: updatedUser.xp,
      level: updatedUser.level,
    },
  };
}

async function awardContestXp(userId, amount) {
  const xpEvent = await xpEventModel.create({
    userId,
    action: "contest_completion",
    source: "contest",
    amount,
    metaData: {},
  });

  const updatedUser = await userModel.findByIdAndUpdate(
    userId,
    { $inc: { xp: amount } },
    { returnDocument: "after" },
  );

  const { level, currentXP, requiredXP } = getLevelProgress(updatedUser.xp);
  if (level !== updatedUser.level) {
    await userModel.findByIdAndUpdate(userId, { level: level });
    updatedUser.level = level;
  }
  emitXPUpdate(userId, {
    xp: updatedUser.xp,
    level: updatedUser.level,
    action: "contest_completion",
    amount,
    currentXP,
    requiredXP,
  });
  return {
    xpEvent,
    user: {
      id: updatedUser._id,
      xp: updatedUser.xp,
      level: updatedUser.level,
    },
  };
}
module.exports = { awardXP, awardContestXp, getLevelProgress };
