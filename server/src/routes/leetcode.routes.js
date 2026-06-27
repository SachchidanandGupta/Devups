const {Router} = require("express");

const router = Router();
const leetcodeController = require("../controllers/leetcode.controller");
router.get("/daily",leetcodeController.getDaily);

module.exports = router;