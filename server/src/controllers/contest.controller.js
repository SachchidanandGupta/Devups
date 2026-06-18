const asyncHandler = require("../utils/asyncHandler");
const { getLeetCodeContest } = require("../services/leetcode.service");
const contestModel = require("../models/contest.model");

const axios = require("axios");
const appError = require("../utils/appError");
const { getIo } = require("../config/socket");
const { emitFriendActivity } = require("../services/socket.service");

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
  const { contestName, participantIds, startTime, endTime } = req.body;

  if (startTime > endTime) {
    throw new appError("startTime can't be after endTime", 400);
  }

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
  });

  emitFriendActivity(participantIds, { type: "friend_request" });

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

  const topScore = contest.scores.reduce((max, score) => {
    return score.xpEarned > max.xpEarned ? score : max;
  }, contest.scores[0]);

  const updateContest = await contestModel
    .findByIdAndUpdate(
      contestId,
      {
        winner: topScore.userId,
        status: "completed",
      },
      {
        returnDocument: "after",
        runValidators: true,
      },
    )
    .populate("winner", "username avatar ");
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

  return res.status(200).json({
    message: "Contest invitation rejected",
    status: "success",
  });
});

module.exports = {
  getContest,
  createContest,
  getFriendContest,
  completeFriendContest,
  acceptContestInvite,
  rejectContestInvite,
};
