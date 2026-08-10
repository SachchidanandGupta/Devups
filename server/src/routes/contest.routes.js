const {Router} = require("express");
const contestController = require("../controllers/contest.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",authMiddleware.authUser,contestController.getContest);
router.get("/:userId/history",contestController.getUserContestHistory);
router.post("/create",authMiddleware.authUser,contestController.createContest);
router.get("/friends",authMiddleware.authUser,contestController.getFriendContest);
router.put("/complete/:contestId",authMiddleware.authUser,contestController.completeFriendContest);
router.delete("/delete/:contestId",authMiddleware.authUser,contestController.deleteContest);
router.put("/invite/accept/:contestId", authMiddleware.authUser, contestController.acceptContestInvite);
router.put("/invite/reject/:contestId", authMiddleware.authUser, contestController.rejectContestInvite);
router.post("/:contestId/mark-solved",authMiddleware.authUser,contestController.markProblemSolved);
module.exports = router