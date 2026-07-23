const {Router} = require("express");

const router = Router();
const leetcodeController = require("../controllers/leetcode.controller");
router.get("/daily",leetcodeController.getDaily);
router.get("/search",leetcodeController.searchLeetcodeProblems);
router.get("/explore", leetcodeController.searchQuestionWithTags);       
router.get("/tags", leetcodeController.getTopicTags);                   
module.exports = router;