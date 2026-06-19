const activityLogModel = require("../models/activityLog.model");
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

module.exports = {
  getRecentActivity,
};
