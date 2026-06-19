const activityLogModel = require("../models/activityLog.model");
const { emitGlobalActivity } = require("./socket.service");

async function logActivity(userId, type, platform, message) {
  try {
    const globalActivity = await activityLogModel.create({
      userId,
      type,
      platform,
      message,
    });

    emitGlobalActivity(null, globalActivity);
  } catch (error) {
    console.error(error.message);
  }

  return;
}

module.exports = {
  logActivity,
};
