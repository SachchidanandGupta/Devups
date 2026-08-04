const mongoose = require("mongoose");

const responseNotificationSchema = new mongoose.Schema(
  {
    recipientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "friend_request_accepted",
        "friend_request_rejected",
        "contest_invite_accepted",
        "contest_invite_rejected",
        "contest_deleted"
      ],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["unread","read", "cleared"],
      default: "unread",
    },
  },
  {
    timestamps: true,
  },
);

responseNotificationSchema.index({ createdAt: -1 });

const responseNotificationModel = mongoose.model(
  "ResponseNotification",
  responseNotificationSchema,
);

module.exports = responseNotificationModel;
