const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Requester is required in friend connection"],
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Reciever is required"],
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected", "blocked"],
      default: "pending",
      required: true,
    },
    blockedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default:null
    },
  },
  {
    timestamps: true,
  },
);

friendSchema.index({ requester: 1, receiver: 1 }, { unique: true });

const friendModel = mongoose.model("FriendShip", friendSchema);

module.exports = friendModel;
