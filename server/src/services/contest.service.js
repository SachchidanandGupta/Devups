const contestModel = require("../models/contest.model");
const appError = require("../utils/appError");
const userModel = require("../models/user.model");
const { createActivityLog } = require("./activityLog.service");
const { getRecentAcSubmission } = require("./leetcode.service");

async function verifyAndCreditSolve(userId, contestId, titleSlug) {
  const contest = await contestModel.findById(contestId);
  if (!contest || contest.status !== "active") {
    throw new appError("Contest is not active", 400);
  }

  const problem = contest.problems.find((p) => p.titleSlug === titleSlug);
  if (!problem) {
    throw new appError("Problem is not part of this contest", 404);
  }

  const user = await userModel.findById(userId);
  if (!user.leetcodeUsername) {
    throw new appError("No LeetCode username linked", 400);
  }

  const recent = await getRecentAcSubmission(user.leetcodeUsername, 20);
  const solved = recent.some((s) => s.titleSlug === titleSlug);
  if (!solved) {
    throw new appError("No accepted submission found for this problem yet", 404);
  }

  return updateContestScores(userId, contestId, problem.xpReward, titleSlug);
}

async function reconcileContestSolves(contest) {
  const users = await userModel.find({ _id: { $in: contest.participants } });
  for (const user of users) {
    if (!user.leetcodeUsername) continue;
    let recent;
    try {
      recent = await getRecentAcSubmission(user.leetcodeUsername, 50);
    } catch (error) {
      console.error(
        `Reconciliation fetch failed for ${user.leetcodeUsername}:`,
        error.message,
      );
      continue;
    }
    const solvedSlugs = new Set(recent.map((s) => s.titleSlug));
    const entry = contest.scores.find(
      (s) => String(s.userId) === String(user._id),
    );
    const alreadySolved = new Set(entry?.solvedProblems || []);
    for (const problem of contest.problems) {
      if (solvedSlugs.has(problem.titleSlug) && !alreadySolved.has(problem.titleSlug)) {
        await updateContestScores(user._id, contest._id, problem.xpReward, problem.titleSlug);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 300));
  }
}

async function finalizeContest(contestId) {
  const contest = await contestModel.findById(contestId);
  if (!contest) {
    throw new appError("Contest not found", 404);
  }
  if (contest.status === "completed") {
    throw new appError("Contest already completed", 400);
  }

  await reconcileContestSolves(contest);
  const refreshedContest = await contestModel.findById(contestId);

  const winnerId = determineWinner(refreshedContest);

  const updatedContest = await contestModel
    .findByIdAndUpdate(
      contestId,
      { winner: winnerId, status: "completed" },
      { returnDocument: "after", runValidators: true },
    )
    .populate("winner", "username avatar");

  if (winnerId) {
    const winnerEntry = refreshedContest.scores.find(
      (s) => String(s.userId) === String(winnerId),
    );
    await createActivityLog({
      userId: winnerId,
      type: "contest_ranked",
      platform: "devups",
      message: `won the contest ${refreshedContest.contestName}`,
      contestId: refreshedContest._id,
      metaData: {
        xpEarned: winnerEntry?.xpEarned || 0,
        solvedCount: winnerEntry?.solvedCount || 0,
      },
    });
  }

  await Promise.all(
    refreshedContest.scores
      .filter((c) => c.xpEarned > 0)
      .map((c) => awardContestXp(c.userId, c.xpEarned)),
  );

  return updatedContest;
}



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
      solvedProblems: [],
    });
    entry = contest.scores[contest.scores.length - 1];
  }

  if (entry.solvedProblems.includes(titleSlug)) {
    return entry;
  }

  const wasBelow = entry.xpEarned < contest.computedTarget;
  entry.xpEarned += xpReward;
  entry.solvedCount += 1;
  entry.lastUpdatedAt = new Date();
  entry.solvedProblems.push(titleSlug);

  if (
    wasBelow &&
    entry.xpEarned >= contest.computedTarget &&
    !entry.reachedTargetAt
  )
    entry.reachedTargetAt = new Date();

  await contest.save();

  const problem = contest.problems.find((p) => p.titleSlug === titleSlug);
  const message = `solved ${problem ? problem.title : titleSlug} in ${contest.contestName}`;

  await createActivityLog({
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
  verifyAndCreditSolve,
  finalizeContest,
};

