const asyncHandler = require("../utils/asyncHandler");
const appError = require("../utils/appError");
const userModel = require("../models/user.model");
const friendModel = require("../models/friends.model");
const { isUserOnline } = require("../config/socket");
const {
  emitFriendActivity,
  emitFriendRequest,
} = require("../services/socket.service");
const {
  createResponseNotification,
} = require("../services/responseNotification.service");

const { getLevelProgress } = require("../services/xp.service");

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
  emitFriendRequest(receiverId, friendShip);
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
      { status: "blocked", blockedBy: userId },
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

const unblockUser = asyncHandler(async function (req, res) {
  const unBlockUserId = req.params.unBlockUserId;
  const userId = req.user.id;
  const unBlocked = await friendModel.findOneAndDelete({
    $or: [
      { receiver: userId, requester: unBlockUserId },
      { receiver: unBlockUserId, requester: userId },
    ],
    status: "blocked",
    blockedBy: userId,
  });
  if (!unBlocked) {
    throw new appError("Action not allowed", 400);
  }
  return res.status(200).json({
    message: " user unblocked successfully",
    success: true,
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
    const friend =
      friendship.requester._id.toString() === userId
        ? friendship.receiver
        : friendship.requester;

    const { currentXP, requiredXP } = getLevelProgress(friend.xp);
    const onlineStatus = isUserOnline(friend._id.toString());
    return {
      ...friend.toObject(),
      onlineStatus,
      currentXP,
      requiredXP,
    };
  });
  return res.status(200).json({
    message: "friendList fetched successfully.",
    status: "success",
    count: friends.length,
    friendList: friends,
  });
});

const getFriendStatusWithLoggedInUser = asyncHandler(async function (req, res) {
  const userId = req.params.userId;
  const loggedInUserId = req.user.id;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new appError("User not found", 404);
  }
  const friendships = await friendModel
    .find({
      $or: [{ receiver: userId }, { requester: userId }],
      status: "accepted",
    })
    .populate("receiver", "username avatar level xp")
    .populate("requester", "username avatar xp level");

  const friends = friendships.map(function (friendShip) {
    if (friendShip.requester._id.toString() === userId) {
      return friendShip.receiver;
    }
    return friendShip.requester;
  });

  const friendsIds = friends.map((f) => f._id);
  const statuses = await friendModel.find({
    $or: [
      { requester: loggedInUserId, receiver: { $in: friendsIds } },
      { requester: { $in: friendsIds }, receiver: loggedInUserId },
    ],
  });

  const statusMap = new Map();
  for (const record of statuses) {
    const otherId =
      record.requester.toString() !== loggedInUserId
        ? record.requester
        : record.receiver;

    statusMap.set(otherId, {
      status: record.status,
      isRequester: record.requester.toString() === loggedInUserId,
    });
  }

  const enriched = friends.map((friend) => {
    const record = statusMap.get(friend._id.toString());
    let friendStatus = "not_friends";
    if (record) {
      if (record.status === "accepted") friendStatus = "friends";
      else if (record.status === "pending")
        friendStatus = record.isRequester ? "request_sent" : "request_received";
      else if (record.status === "blocked") friendStatus = "blocked";
    }
    return {
      ...friend.toObject(),
      friendStatus,
    };
  });

  return res.status(200).json({
    message: "FriendList fetched successfully",
    status: "Success",
    friendList: enriched,
    count: enriched.length,
  });
});

const getFriendStatus = asyncHandler(async function (req, res) {
  const loggedInUserId = req.user.id;
  const userId = req.params.userId;
  const user = await userModel.findById(userId);
  if (!user) {
    throw new appError("user not found", 404);
  }
  const friendDoc = await friendModel.findOne({
    $or: [
      { receiver: loggedInUserId, requester: userId },
      { receiver: userId, requester: loggedInUserId },
    ],
  });
  let friendStatus = { status: "not_friends", blockedBy: null };
  if (!friendDoc) {
    return res.status(200).json({ status: "success", friendStatus });
  }
  if (friendDoc.status === "accepted") friendStatus.status = "friends";
  else if (friendDoc.status === "pending")
    friendStatus.status =
      friendDoc.requester.toString() === loggedInUserId
        ? "request_sent"
        : "request_received";
  else if (friendDoc.status === "blocked") {
    friendStatus.status = "blocked";
    friendStatus.blockedBy = friendDoc.blockedBy.toString();
  }

  return res.status(200).json({
    status: "success",
    friendStatus
  });
});

module.exports = {
  sendRequest,
  pendingRequests,
  respondResquest,
  unFriend,
  getFriends,
  blockUser,
  unblockUser,
  getFriendStatusWithLoggedInUser,
  getFriendStatus,
};
