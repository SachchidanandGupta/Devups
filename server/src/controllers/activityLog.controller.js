const activityLogModel = require("../models/activityLog.model");
const userModel = require("../models/user.model");
const appError = require("../utils/appError");
const friendModel = require("../models/friends.model");
const { getFriendIds } = require("../services/friendship.service");
const asyncHandler = require("../utils/asyncHandler");

const getRecentActivity = asyncHandler(async function (req, res) {
  const scope = req.query.scope;
  const userId = req.user.id;
  if (scope === "friends") {
    const friendIds = await getFriendIds(userId);
    const friendActivitys = await activityLogModel
      .find({
        userId: { $in: friendIds },
      })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("userId", "username");
    return res.status(200).json({
      success: true,
      activities: friendActivitys,
    });
  } else if (scope === "contest") {
    const contestId = req.query.contestId;
    const contestActivities = await activityLogModel
      .find({ contestId })
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("userId", "username");
    return res.status(200).json({
      success: true,
      activities: contestActivities,
    });
  } else {
    const activities = await activityLogModel
      .find({})
      .sort({ createdAt: -1 })
      .limit(20)
      .populate("userId", "username");
    return res.status(200).json({
      success: true,
      activities,
    });
  }
});

const getUserActivity = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new appError("User not found", 404);
  }
  const activities = await activityLogModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(10)
    .populate("userId", "username ");
  if (activities.length === 0) {
    throw new appError("No recent action found", 404);
  }
  return res.status(200).json({
    success: true,
    activities,
  });
});

module.exports = {
  getRecentActivity,
  getUserActivity,
};
