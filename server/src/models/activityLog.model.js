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
      enum: ["contest_created", "problem_solved", "contest_ranked"],
      required:true
    },
    platform:{
        type:String,
        enum:["leetcode", "codeforces", "github", "devups"],
        required:true
    },
    message:{
        type:String,
        required:true
    }
  },
  {
    timestamps: true,
  },
);

activityLogSchema.index({createdAt:-1});

const activityLogModel = mongoose.model("ActivityLog",activityLogSchema);

module.exports = activityLogModel
