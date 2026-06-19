const responseNotificationModel = require("../models/responseNotification.model");

const { emitNotification } = require("./socket.service");

async function createResponseNotification(recipientId, type, message) {
  try {
    const notifi = await responseNotificationModel.create({
      recipientId,
      type,
      message,
    });
    emitNotification(recipientId, notifi);
  } catch (error) {
    console.error(error.message);
  }
  return;
}

module.exports = {
  createResponseNotification,
};
