const {Router} = require("express");

const router = Router();
const leaderboardController = require("../controllers/leaderboard.controller");
const authMiddleware = require("../middlewares/auth.middleware");

router.get("/global",authMiddleware.authUser,leaderboardController.getGlobalLeaderboard);
router.get("/friends",authMiddleware.authUser,leaderboardController.getFriendLeaderBoard);


module.exports = router;