const asyncHandler = require("../utils/asyncHandler");
const { getLeetCodeContest } = require("../services/leetcode.service");
const contestModel = require("../models/contest.model");

const axios = require("axios");
const appError = require("../utils/appError");
const { getIo } = require("../config/socket");

async function getCodeforcesContest() {
  const response = await axios.get(
    "https://codeforces.com/api/contest.list?gym=false",
  );
  return response.data.result;
}

const getContest = asyncHandler(async function (req, res) {
  const [leetContest, codeContest] = await Promise.all([
    getLeetCodeContest(),
    getCodeforcesContest(),
  ]);
  const codeForcesContest = codeContest
    .filter((contest) => contest.phase === "BEFORE")
    .map((contest) => ({
      platform: "CodeForces",
      title: contest.title,
      startTime: new Date(contest.startTime * 1000),
      duration: contest.duration,
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
  const { participantIds, startTime, endTime } = req.body;
  if (startTime > endTime) {
    throw new appError("startTime can't past than endTime", 400);
  }

  const createContest = await contestModel.create({
    creator: creatorID,
    participants: [creatorID, ...participantIds],
    startTime,
    endTime,
  });

  return res.status(201).json({
    message: "Contest created successfully.",
    status: "success",
    createContest,
  });
});

const getFriendContest = asyncHandler(async function (req, res) {
  const userID = req.user.id;
  const friendContest = await contestModel
    .find({
      $or: [{ creator: userID }, { participants: userID }],
    })
    .populate([
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
      return  score.xpEarned > max.xpEarned ? score : max;
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
    contestName: contest.title || "Friend Contest",
    winner: updateContest.winner.username,
  });
  return res.status(200).json({
    message: "Contest completed",
    status: "success",
    winner: updateContest.winner,
  });
});

module.exports = {
  getContest,
  createContest,
  getFriendContest,
  completeFriendContest,
};
