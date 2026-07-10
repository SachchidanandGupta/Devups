const asyncHandler = require("../utils/asyncHandler");
const { getLeetCodeContest } = require("../services/leetcode.service");
const contestModel = require("../models/contest.model");
const axios = require("axios");
const appError = require("../utils/appError");
const { getIo } = require("../config/socket");
const { emitFriendActivity } = require("../services/socket.service");
const { logActivity } = require("../services/activityLog.service");
const {
  createResponseNotification,
} = require("../services/responseNotification.service");
const userModel = require("../models/user.model");
const { determineWinner } = require("../services/contest.service");
const { awardContestXp } = require("../services/xp.service");
const { contestXpRewards } = require("../constants/xpRewards");
// async function getCodeforcesContest() {
//   const response = await axios.get(
//     "https://codeforces.com/api/contest.list?gym=false",
//     {
//       headers: {
//         "User-Agent": "Mozilla/5.0",
//       },
//     },
//   );

//   return response.data.result;
// }

const getContest = asyncHandler(async function (req, res) {
  const [leetContest, codeContest = []] = await Promise.all([
    getLeetCodeContest(),
    // getCodeforcesContest(),
  ]);

  const codeForcesContest = (codeContest ?? [])
    .filter((contest) => contest.phase === "BEFORE")
    .map((contest) => ({
      platform: "CodeForces",
      title: contest.name,
      startTime: new Date(contest.startTimeSeconds * 1000),
      duration: Math.floor(contest.durationSeconds / 60),
    }));
  const contestData = [...leetContest, ...codeForcesContest].sort(
    (a, b) => a.startTime - b.startTime,
  );
  return res.status(200).json({
    message: "Contests fetched successfully",
    status: "success",
    contestData,
  });
});

const createContest = asyncHandler(async function (req, res) {
  const creatorID = req.user.id;
  const {
    contestName,
    participantIds,
    startTime,
    endTime,
    problems = [],
  } = req.body;
  if (problems.length === 0)
    throw new appError("Contest must have at least one problem", 400);

  if (startTime > endTime) {
    throw new appError("startTime can't be after endTime", 400);
  }

  const durationMs = new Date(endTime) - new Date(startTime);
  const minDuration = 30 * 60 * 1000; // 30 minutes
  const maxDuration = 24 * 60 * 60 * 1000; // 24 hours

  if (durationMs < minDuration) {
    throw new appError("Contest must be at least 30 minutes long", 400);
  }
  if (durationMs > maxDuration) {
    throw new appError("Contest cannot exceed 24 hours", 400);
  }
  const mappedProblems = problems.map((p) => {
    const difficulty = p.difficulty.toLowerCase();
    const xpReward = contestXpRewards[difficulty];
    if (!xpReward)
      throw new appError(`Invalid difficulty: ${p.difficulty}`, 400);
    return {
      platform: p.platform || "leetcode",
      titleSlug: p.titleSlug,
      title: p.title,
      difficulty,
      xpReward,
    };
  });

  const invitations = participantIds.map((id) => ({
    userId: id,
    status: "pending",
  }));

  const newContest = await contestModel.create({
    contestName,
    creator: creatorID,
    participants: [creatorID],
    invitations,
    startTime,
    endTime,
    problems: mappedProblems,
  });

  participantIds.forEach((id) =>
    emitFriendActivity(id, { type: "contest_invite" }),
  );
  logActivity(
    creatorID,
    "contest_created",
    "devups",
    `${req.user.username} initiated a contest: ${contestName}`,
  );

  return res.status(201).json({
    message: "Contest created successfully.",
    status: "success",
    newContest,
  });
});

const getFriendContest = asyncHandler(async function (req, res) {
  const userID = req.user.id;
  const { type } = req.query;
  let query = {
    $or: [{ creator: userID }, { participants: userID }],
  };
  if (type === "incoming") {
    query = {
      "invitations.userId": userID,
      "invitations.status": "pending",
    };
  } else if (type === "active") {
    query = {
      $or: [{ creator: userID }, { participants: userID }],
      status: "active",
    };
  } else if (type === "completed") {
    query = {
      $or: [{ creator: userID }, { participants: userID }],
      status: "completed",
    };
  }
  const friendContest = await contestModel.find(query).populate([
    { path: "creator", select: "username avatar level" },
    { path: "participants", select: "username avatar level" },
    { path: "winner", select: "username avatar level" },
  ]);

  res.status(200).json({
    message: "friends contest fetched",
    status: "success",
    friendContest,
  });
});

const completeFriendContest = asyncHandler(async function (req, res) {
  const contestId = req.params.contestid;
  const contest = await contestModel.findById(contestId);
  if (!contest) {
    throw new appError("contest not found", 404);
  }
  if (contest.creator.toString() !== req.user.id) {
    throw new appError("Unauthorized", 401);
  }
  if (!contest.scores.length) {
    throw new appError("no submission found", 400);
  }
  if (contest.status === "completed") {
    throw new appError("Contest already completed", 400);
  }

  const winnerId = determineWinner(contest);

  const updateContest = await contestModel
    .findByIdAndUpdate(
      contestId,
      {
        winner: winnerId,
        status: "completed",
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    )
    .populate("winner", "username avatar ");
  await Promise.all(
    contest.scores
      .filter((c) => c.xpEarned > 0)
      .map((c) => awardContestXp(c.userId, c.xpEarned)),
  );
  const socket = getIo();
  socket.emit("contest:reminder", {
    contestName: contest.contestName || "Friend Contest",
    winner: updateContest.winner.username,
  });
  return res.status(200).json({
    message: "Contest completed",
    status: "success",
    winner: updateContest.winner,
  });
});

const acceptContestInvite = asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const { contestId } = req.params;

  const contest = await contestModel.findOneAndUpdate(
    { _id: contestId, "invitations.userId": userId },
    {
      $set: { "invitations.$.status": "accepted", status: "active" },
      $push: { participants: userId },
    },
    { returnDocument: "after", runValidators: true },
  );

  if (!contest) throw new appError("Contest or invitation not found", 404);
  createResponseNotification(
    contest.creator,
    "contest_invite_accepted",
    `${req.user.username} accepted your invite to ${contest.contestName}`,
  );
  return res.status(200).json({
    message: "Contest invitation accepted",
    status: "success",
  });
});

const rejectContestInvite = asyncHandler(async function (req, res) {
  const userId = req.user.id;
  const { contestId } = req.params;

  const contest = await contestModel.findOneAndUpdate(
    { _id: contestId, "invitations.userId": userId },
    { $set: { "invitations.$.status": "rejected" } },
    { returnDocument: "after", runValidators: true },
  );

  if (!contest) throw new appError("Contest or invitation not found", 404);
  createResponseNotification(
    contest.creator,
    "contest_invite_rejected",
    `${req.user.username} rejected your invite to ${contest.contestName}`,
  );
  return res.status(200).json({
    message: "Contest invitation rejected",
    status: "success",
  });
});

const getUserContestHistory = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new appError("User not found", 404);
  }
  const contestHistory = await contestModel
    .find({
      $or: [{ creator: userId }, { participants: userId }],
      status: "completed",
    })
    .populate([
      { path: "creator", select: "username avatar level" },
      { path: "participants", select: "username avatar level" },
      { path: "winner", select: "username avatar level" },
    ]);

  const contestHistoryWithRank = contestHistory.map((contest) => {
    const sortedContest = [...contest.scores].sort(
      (a, b) => b.xpEarned - a.xpEarned,
    );
    const rank =
      sortedContest.findIndex((s) => String(s.userId) === String(userId)) + 1;
    return {
      ...contest.toObject(),
      userRank: rank || null,
    };
  });

  return res.status(200).json({
    status: "success",
    contestHistory: contestHistoryWithRank,
  });
});

module.exports = {
  getContest,
  createContest,
  getFriendContest,
  completeFriendContest,
  acceptContestInvite,
  rejectContestInvite,
  getUserContestHistory,
};
