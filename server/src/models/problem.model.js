const mongoose = require("mongoose");

const problemSchema = new mongoose.Schema({
  questionFrontendId: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  titleSlug: {
    type: String,
    required: true,
    unique: true,
  },
  difficulty: {
    type: String,
    enum: ["Easy", "Medium", "Hard"],
    required: true,
  },
  acRate: Number,
}, {
  timestamps: true,
});

module.exports = mongoose.model("Problem", problemSchema);