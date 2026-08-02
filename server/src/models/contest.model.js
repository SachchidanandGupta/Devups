const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    contestName: {
      type: String,
      required: true,
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    invitations: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["pending", "accepted", "rejected"],
          default: "pending",
        },
      },
    ],
    problems: [
      {
        platform: {
          type: String,
          enum: ["leetcode"],
          default: "leetcode",
        },
        titleSlug: {
          type: String,
          required: true,
        },
        title: {
          type: String,
          required: true,
        },
        difficulty: {
          type: String,
          enum: ["easy", "medium", "hard"],
          required: true,
        },
        xpReward: {
          type: Number,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    target: {
      type: Number,
      default: 100,
    },
    startTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "active", "completed"],
      default: "pending",
    },
    endTime: { type: Date, required: true },

    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    scores: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId },
        xpEarned: { type: Number },
        reachedTargetAt: {
          type: Date,
          default: null,
        },
        solvedCount: { type: Number, default: 0 },
        lastUpdatedAt: { type: Date, default: null },
      },
    ],
  },
  { timestamps: true },
);

contestSchema.virtual("computedTarget").get(function () {
  if (this.problems.length) {
    return this.problems.reduce((sum, p) => sum + p.xpReward, 0);
  }
  return this.target;
});

contestSchema.set("toJSON", { virtuals: true });

contestSchema.index({ creator: 1 });
contestSchema.index({ participants: 1 });
contestSchema.index({ status: 1 });
contestSchema.index({ status: 1, startTime: 1 });
contestSchema.index({ status: 1, endTime: 1 });

module.exports = mongoose.model("Contest", contestSchema);
