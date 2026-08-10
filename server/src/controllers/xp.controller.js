const xpEventModel = require("../models/xpEvent.model");
const userModel = require("../models/user.model");
const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getXpHistory = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new appError("User not found", 404);
  }
  const xpEvents = await xpEventModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .limit(50);

  return res.status(200).json({
    success: true,
    xpEvents,
  });
});

module.exports = { getXpHistory };