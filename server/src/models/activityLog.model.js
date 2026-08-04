const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "contest_created",
        "problem_solved",
        "contest_ranked",
        "contest_joined",
        "contest_declined",
      ],
      required: true,
    },
    platform: {
      type: String,
      enum: ["leetcode", "codeforces", "github", "devups"],
      default: "devups",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    contestId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Contest",
      required: false,
    },
    metaData: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  {
    timestamps: true,
  },
);

activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ contestId: 1, createdAt: -1 });
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });
const activityLogModel = mongoose.model("ActivityLog", activityLogSchema);

module.exports = activityLogModel;
