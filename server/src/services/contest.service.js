const contestModel = require("../models/contest.model");
const appError = require("../utils/appError");

async function updateContestScores(userId, contestId, xpReward) {
  const contest = await contestModel.findById(contestId);
  if (!contest || contest.status != "active") {
    return;
  }
  let entry = contest.scores.find((s) => String(userId) === String(s.userId));
  if (!entry) {
    contest.scores.push({
      userId,
      xpEarned: 0,
      reachedTargetAt: null,
      solvedCount: 0,
      lastUpdatedAt: null,
    });

    entry = contest.scores[contest.scores.length - 1];
  }

  const wasBelow = entry.xpEarned < contest.computedTarget;
  entry.xpEarned += xpReward;
  entry.solvedCount += 1;
  entry.lastUpdatedAt = new Date();

  if (
    wasBelow &&
    entry.xpEarned >= contest.computedTarget &&
    !entry.reachedTargetAt
  )
    entry.reachedTargetAt = new Date();

  await contest.save();
}

module.exports = {
  updateContestScores,
};
