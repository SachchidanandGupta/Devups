const { Router } = require("express");

const router = Router();

const friendController = require("../controllers/friendShip.controller");
const authMiddlerware = require("../middlewares/auth.middleware");

router.post(
  "/send/:receiverId",
  authMiddlerware.authUser,
  friendController.sendRequest,
);
router.get(
  "/requests",
  authMiddlerware.authUser,
  friendController.pendingRequests,
);
router.put(
  "/respond/:requestId",
  authMiddlerware.authUser,
  friendController.respondResquest,
);
router.delete(
  "/unfriend/:friendId",
  authMiddlerware.authUser,
  friendController.unFriend,
);
router.put(
  "/block/:blockUserId",
  authMiddlerware.authUser,
  friendController.blockUser,
);
router.get("/status/:userId", authMiddlerware.authUser, friendController.getFriendStatus);
router.get("/:userId/friends", authMiddlerware.authUser, friendController.getFriendsById);
router.get("/", authMiddlerware.authUser, friendController.getFriends);
module.exports = router;
