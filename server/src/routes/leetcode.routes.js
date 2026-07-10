const {Router} = require("express");

const router = Router();
const leetcodeController = require("../controllers/leetcode.controller");
const { authUser } = require("../middlewares/auth.middleware");
router.get("/daily",leetcodeController.getDaily);
router.get("/search",authUser,leetcodeController.searchLeetcodeProblems);

module.exports = router;