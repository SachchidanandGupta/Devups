const { getIo } = require("../config/socket");

function handleSocket(userId = null, data = null, eventName) {
  try {
    const io = getIo();
    if (userId) {
      io.to(userId).emit(eventName, data);
    } else {
      io.emit(eventName, data);
    }
  } catch (err) {
    console.error("Socket emit failed:", err.message);
  }
  return;
}

function emitXPUpdate(userId, data) {
  handleSocket(userId, data, "xp:updated");
}

function emitLeaderboardUpdate(data) {
  handleSocket(null, data, "leaderboard:refresh");
}

function emitContestReminder(data) {
  handleSocket(null, data, "contest:reminder");
}

function emitContestInvite(userId,data){
  handleSocket(userId,data,"contest:invite");
}

function emitFriendActivity(userId, data) {
  handleSocket(userId, data, "friend:activity");
}

function emitFriendRequest(userId,data){
  handleSocket(userId,data,"friend:friend_Request");
}

function emitGlobalActivity(userId, data) {
  handleSocket(userId, data, "activity:new");
}

function emitNotification(userId, data) {
  handleSocket(userId, data, "notification:new");
}

module.exports = {
  emitXPUpdate,
  emitLeaderboardUpdate,
  emitContestReminder,
  emitFriendActivity,
  emitGlobalActivity,
  emitNotification,
  emitFriendRequest,
  emitContestInvite
};
