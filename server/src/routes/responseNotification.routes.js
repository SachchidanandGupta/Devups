const { Router } = require("express");

const router = Router();
const {
  clearAllNotifications,
  clearNotification,
  getNotifications,
} = require("../controllers/responceNotification.controller");
const { authUser } = require("../middlewares/auth.middleware");
router.get("/", authUser, getNotifications);
router.put("/clear-all", authUser, clearAllNotifications);
router.put("/:notificationId", authUser, clearNotification);
module.exports = router
