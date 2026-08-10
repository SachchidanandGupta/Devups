const activityLogModel = require("../models/activityLog.model");
const { emitGlobalActivity, emitContestProgress } = require("./socket.service");

async function createActivityLog({
  userId,
  type,
  platform,
  message,
  contestId,
  metaData,
}) {
  const activity = await activityLogModel.create({
    userId,
    type,
    platform,
    message,
    contestId,
    metaData,
  });

  switch (type) {
    case "contest_created":
      emitGlobalActivity(activity);
      break;
    case "contest_ranked":
      emitGlobalActivity(activity);
      if (contestId) emitContestProgress(contestId, activity);
      break;
    case "problem_solved":
      if (contestId) emitContestProgress(contestId, activity);
      break;
    case "contest_joined":
      if (contestId) emitContestProgress(contestId, activity);
      break;
    case "contest_declined":
      if (contestId) emitContestProgress(contestId, activity);
      break;
    case "amazing_rank":
      emitGlobalActivity(activity);
      break;

    default:
      break;
  }

  return activity;
}

module.exports = { createActivityLog };
