const responseNotificationModel = require("../models/responseNotification.model");
const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getNotifications = asyncHandler(async function (req, res) {
  const recipientId = req.user.id;
  const notification = await responseNotificationModel
    .find({
      status: "unread",
      recipientId: recipientId,
    })
    .sort({ createdAt: -1 })
    .limit(5);

  return res.status(200).json({
    success: true,
    notification,
  });
});

const clearNotification = asyncHandler(async function (req, res) {
  const notificationId = req.params.notificationId;
  const recipientId = req.user.id;
  const notification = await responseNotificationModel.findOneAndUpdate(
    { _id: notificationId, recipientId },
    { status: "cleared" },
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
    { recipientId, status: "unread" },
    { status: "cleared" },
  );
  return res.status(200).json({
    status: true,
    modifiedCount: notification.modifiedCount,
  });
});

module.exports = {
  getNotifications,
  clearNotification,
  clearAllNotifications,
};
