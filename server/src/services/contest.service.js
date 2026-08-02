const contestModel = require("../models/contest.model");
const appError = require("../utils/appError");
const { getFriendIds } = require("./friendship.service");
const { createActivityLog } = require("./activityLog.service");
const {
  emitGlobalActivity,
  emitFriendActivity,
  emitContestProgress,
} = require("./socket.service");

async function updateContestScores(userId, contestId, xpReward, titleSlug) {
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
  const problem = contest.problems.find((p) => p.titleSlug === titleSlug);
  const message = `solved ${problem ? problem.title : titleSlug} in ${contest.contestName}`;

  const activity = await createActivityLog({
    userId,
    type: "problem_solved",
    platform: "leetcode",
    message,
    contestId,
    metaData: {
      titleSlug,
      xpEarned: entry.xpEarned,
      solvedCount: entry.solvedCount,
    },
  });

  emitContestProgress(contestId, activity);

  const friendIds = await getFriendIds(userId);
  for (const friendId of friendIds) {
    emitFriendActivity(friendId, activity);
  }

  emitGlobalActivity(activity);

  return entry;
}

function determineWinner(contest) {
  const { computedTarget, scores } = contest || {};
  if (scores.length === 0) return null;
  const finishers = scores.filter((s) => s.xpEarned >= computedTarget);
  if (finishers.length === 1) return finishers[0].userId;
  if (finishers.length > 1) {
    finishers.sort(
      (a, b) => new Date(a.reachedTargetAt) - new Date(b.reachedTargetAt),
    );
    return finishers[0].userId;
  }

  const sortByXpEarned = [...scores].sort((a, b) => b.xpEarned - a.xpEarned);
  const highestXpScored = sortByXpEarned[0].xpEarned;
  const topXp = sortByXpEarned.filter((s) => s.xpEarned === highestXpScored);
  if (topXp.length === 1) return topXp[0].userId;
  topXp.sort((a, b) => b.solvedCount - a.solvedCount);
  const highestSolved = topXp[0].solvedCount;
  const topSolved = topXp.filter((s) => s.solvedCount === highestSolved);

  topSolved.sort(
    (a, b) => new Date(a.lastUpdatedAt) - new Date(b.lastUpdatedAt),
  );

  return topSolved[0].userId;
}

module.exports = {
  updateContestScores,
  determineWinner,
};
