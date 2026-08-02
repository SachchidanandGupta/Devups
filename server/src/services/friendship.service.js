const friendModel = require("../models/friends.model");

async function getFriendIds(userId) {
  const friendships = await friendModel.find({
    $or: [
      {
        requester: userId,
      },
      { receiver: userId },
    ],
    status: "accepted",
  });
  const friendIds = friendships.map(function (friendship) {
    return friendship.requester.toString() === userId.toString()
      ? friendship.receiver
      : friendship.requester;
  });
  return friendIds;
}

module.exports = {
  getFriendIds,
};
