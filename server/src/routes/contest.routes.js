const {Router} = require("express");
const contestController = require("../controllers/contest.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.get("/",authMiddleware.authUser,contestController.getContest);
router.post("/create",authMiddleware.authUser,contestController.createContest);
router.get("/friends",authMiddleware.authUser,contestController.getFriendContest);
router.put("/complete/:contestid",authMiddleware.authUser,contestController.completeFriendContest);

module.exports = router