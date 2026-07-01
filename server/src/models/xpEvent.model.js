const mongoose = require("mongoose");

const xpEventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    source: {
      type: String,
      enum: ["leetcode", "github", "codeforces", "streak", "contest"],
      required: [true, "source is required"],
    },
    action: {
      type: String,
      enum: [
        "solve_easy",
        "solve_hard",
        "solve_medium",
        "contest_participation",
        "contest_top10",
        "contest_top25",
        "github_commit",
        "github_pr",
        "daily_streak",
        "contest_completion",
      ],
      required: [true, "action is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount of xp is required"],
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

xpEventSchema.index({ userId: 1 });
xpEventSchema.index({ userId: 1, createdAt: -1 });

const xpEventModel = mongoose.model("XPEvent", xpEventSchema);

module.exports = xpEventModel;
