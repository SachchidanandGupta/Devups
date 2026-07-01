const activityLogModel = require("../models/activityLog.model");
const userModel = require("../models/user.model");
const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getRecentActivity = asyncHandler(async function (req, res) {
  const activities = await activityLogModel
    .find({})
    .sort({ createdAt: -1 })
    .limit(20)
    .populate("userId", "username");
  return res.status(200).json({
    success: true,
    activities,
  });
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
  getUserActivity
};
