const responseNotificationModel = require("../models/responseNotification.model");
const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getNotifications = asyncHandler(async function (req, res) {
  const recipientId = req.user.id;
  const notification = await responseNotificationModel
    .find({
      status: {$in :["unread","read"]},
      recipientId: recipientId,
    })
    .sort({ createdAt: -1 });

  return res.status(200).json({
    success: true,
    notification,
  });
});

const readNotification = asyncHandler(async function (req, res) {
  const recipientId = req.user.id;
  const notification = await responseNotificationModel.updateMany(
    { recipientId },
    { status: "read" },
  );
  if (!notification) {
    throw new appError("notification not found", 400);
  }
  return res.status(200).json({
    status: true,
    notification,
  });
});

const clearAllNotifications = asyncHandler(async function (req, res) {
  const recipientId = req.user.id;
  const notification = await responseNotificationModel.updateMany(
    { recipientId:recipientId, status:{$in:["unread","read"]} },
    { status: "cleared" },
  );
  return res.status(200).json({
    status: true,
    modifiedCount: notification.modifiedCount,
  });
});

module.exports = {
  getNotifications,
  readNotification,
  clearAllNotifications,
};
