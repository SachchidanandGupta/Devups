const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/appError");
const userModel = require("../models/user.model");
const friendModel = require("../models/friends.model");
const { emitFriendActivity } = require("../services/socket.service");
const {
  createResponseNotification,
} = require("../services/responseNotification.service");

const sendRequest = asyncHandler(async function (req, res) {
  const receiverId = req.params.receiverId;
  const senderId = req.user.id;

  if (receiverId == senderId) {
    throw new appError(" you cannot send friend request to yourself", 400);
  }
  const isReceiverExists = await userModel
    .findOne({
      _id: receiverId,
    })
    .select("-passwordHash -githubId  -isEmailVerified -role ");

  if (!isReceiverExists) {
    throw new appError("user not founded", 404);
  }
  const isFriendRecord = await friendModel.findOne({
    $or: [
      { requester: senderId, receiver: receiverId },
      { requester: receiverId, receiver: senderId },
    ],
  });
  if (isFriendRecord) {
    if (isFriendRecord.status == "pending")
      throw new appError("friend request already sent", 409);
    if (isFriendRecord.status == "accepted")
      throw new appError("already a friend", 409);
    if (isFriendRecord.status == "blocked")
      throw new appError("action not allowed", 403);
  }

  const friendShip = await friendModel.create({
    requester: senderId,
    receiver: receiverId,
    status: "pending",
  });
  emitFriendActivity(receiverId, { type: "friend_request" });
  return res.status(201).json({
    message: "Friend request sent successfully",
    friendShip,
  });
});

const pendingRequests = asyncHandler(async function (req, res) {
  const receiverId = req.user.id;

  const pendings = await friendModel
    .find({ receiver: receiverId, status: "pending" })
    .populate("requester", "username avatar level");
  return res.status(200).json({
    message: "pending requests sent successfully.",
    pendings,
  });
});

const respondResquest = asyncHandler(async function (req, res) {
  const requestId = req.params.requestId;
  const userId = req.user.id;
  const { requestResponse } = req.body;
  const isFriendShipExists = await friendModel.findOne({
    requester: requestId,
    receiver: userId,
  });
  if (!isFriendShipExists) {
    throw new appError("friendShip not found", 404);
  }
  if (isFriendShipExists.status !== "pending") {
    throw new appError("friend request already resolved", 400);
  }

  if (requestResponse == "accepted") {
    const acceptedRequest = await friendModel.findByIdAndUpdate(
      isFriendShipExists.id,
      { status: "accepted" },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    createResponseNotification(
      requestId,
      "friend_request_accepted",
      `${req.user.username} accepted your friend request`,
    );
    return res.status(200).json({
      message: "friend request accepted",
      status: "success",
    });
  } else if (requestResponse == "rejected") {
    const declineRequest = await friendModel.findByIdAndUpdate(
      isFriendShipExists.id,
      { status: "rejected" },
      {
        returnDocument: "after",
        runValidators: true,
      },
    );
    createResponseNotification(
      requestId,
      "friend_request_rejected",
      `${req.user.username} rejected your friend request`,
    );
    return res.status(200).json({
      message: "friend request rejected",
      status: "success",
    });
  } else {
    throw new appError(
      "Invalid response request should be 'rejected' or 'accepted' ",
      400,
    );
  }
});

const unFriend = asyncHandler(async function (req, res) {
  const friendId = req.params.friendId;
  const userId = req.user.id;
  const isFriendRecord = await friendModel.findOne({
    $or: [
      { requester: friendId, receiver: userId },
      { requester: userId, receiver: friendId },
    ],
    status: "accepted",
  });
  if (!isFriendRecord) {
    throw new appError("friendShip not found", 404);
  }
  const unFriendUser = await friendModel.deleteOne({
    $or: [
      { requester: friendId, receiver: userId },
      { requester: userId, receiver: friendId },
    ],
  });
  return res.status(200).json({
    message: "friendShip is removed ",
    status: "success",
  });
});

const blockUser = asyncHandler(async function (req, res) {
  const blockedUser = req.params.blockUserId;
  const userId = req.user.id;
  const isFriendShipExists = await friendModel.findOne({
    $or: [
      { requester: userId, receiver: blockedUser },
      { requester: blockedUser, receiver: userId },
    ],
  });
  if (isFriendShipExists) {
    const blockUser = await friendModel.findByIdAndUpdate(
      isFriendShipExists.id,
      { status: "blocked" },
      { returnDocument: "after", runValidators: true },
    );
    return res.status(200).json({
      message: "user blocked successfully",
      status: "success",
    });
  }
  const friendRecord = await friendModel.create({
    requester: userId,
    receiver: blockedUser,
    status: "blocked",
  });
  return res.status(201).json({
    message: "user blocked successfully.",
    status: "success",
  });
});

const getFriends = asyncHandler(async function (req, res) {
  const userId = req.user.id;
  if (!userId) {
    throw new appError("user not found", 404);
  }
  const friendships = await friendModel
    .find({
      $or: [{ requester: userId }, { receiver: userId }],
      status: "accepted",
    })
    .populate("requester", "username avatar xp level")
    .populate("receiver", "username avatar xp level");

  const friends = friendships.map(function (friendship) {
    if (friendship.requester._id.toString() === userId) {
      return friendship.receiver;
    }
    return friendship.requester;
  });

  return res.status(200).json({
    message: "friendList fetched successfully.",
    status: "success",
    count: friends.length,
    friendList: friends,
  });
});

module.exports = {
  sendRequest,
  pendingRequests,
  respondResquest,
  unFriend,
  getFriends,
  blockUser,
};
