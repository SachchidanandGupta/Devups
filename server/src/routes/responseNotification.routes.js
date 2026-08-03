const { Router } = require("express");

const router = Router();
const {
  clearAllNotifications,
  readNotification,
  getNotifications,
} = require("../controllers/responceNotification.controller");
const { authUser } = require("../middlewares/auth.middleware");
router.get("/", authUser, getNotifications);
router.put("/clear-all", authUser, clearAllNotifications);
router.put("/read", authUser,readNotification );
module.exports = router
