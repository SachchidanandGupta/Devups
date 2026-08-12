const XP_VALUES = {
  solve_easy: 10,
  solve_medium: 25,
  solve_hard: 50,
  contest_top25: 30,
  contest_top10: 60,
  github_commit: 3,
  github_pr: 15,
  daily_streak: 10,
  codeforces_amazing_rank: 120,
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
  return { level, threshold, cost };
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

async function applyXPGain(userId, source, action, amount, metaData = {}) {
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
    user: { id: updatedUser._id, xp: updatedUser.xp, level: updatedUser.level },
  };
}

async function awardXP(userId, source, action, metaData = {}) {
  const amount = XP_VALUES[action];
  if (!amount) {
    throw new Error("InValid action" + action);
  }
  return applyXPGain(userId, source, action, amount, metaData);
}

async function awardBatchedXP(userId, source, action, count, metaData = {}) {
  const perUnit = XP_VALUES[action];
  if (!perUnit) {
    throw new Error("InValid action" + action);
  }
  if (!count || count <= 0) {
    throw new Error("count must be a positive number");
  }
  const amount = perUnit * count;
  return applyXPGain(userId, source, action, amount, { ...metaData, count });
}

async function awardContestXp(userId, amount) {
  return applyXPGain(userId, "contest", "contest_completion", amount, {});
}

module.exports = { awardXP, awardBatchedXP, awardContestXp, getLevelProgress };