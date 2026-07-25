const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema(
  {
    questionFrontendId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
    },
    titleSlug: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },

    acRate: {
      type: Number,
      default: 0,
    },

    topicTags: [
      {
        name: {
          type: String,
          required: true,
        },
      },
    ],
    url: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Problem", problemSchema);
