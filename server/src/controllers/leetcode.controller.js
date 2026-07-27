const asyncHandler = require("../utils/asyncHandler");
const {
  getDailyQuestion,
  getSearchProblemsWithTitleOrNumber,
  getQuestionsWithTags,
  getAllTopicTags,
  getExploreQuestions
} = require("../services/leetcode.service");
const appError = require("../utils/appError");

const getDaily = asyncHandler(async function (req, res) {
  const daily = await getDailyQuestion();
  if (!daily) {
    throw new appError("No daily question data returned", 404);
  }
  return res.status(200).json({
    success: true,
    daily,
  });
});

const searchLeetcodeProblems = asyncHandler(async function (req, res) {
  const { q } = req.query;
  if (!q || q.trim() === "")
    throw new appError("Search query is required", 400);
  const problems = await getSearchProblemsWithTitleOrNumber(q);
  return res.status(200).json({
    status: "success",
    problems,
  });
});

const searchQuestionWithTags = asyncHandler(async function (req, res) {
  const { tags, q } = req.query;
  const tagArray = tags ? tags.split(",") : [];
  const tagProblems = await getQuestionsWithTags(tagArray, q);
  return res.status(200).json({
    status: "success",
    tagProblems,
  });
});

const getTopicTags = asyncHandler(async function(req,res){
  const topicTags = await getAllTopicTags();
  return res.status(200).json({
    status:"success",
    topicTags
  })
});

const exploreQuestionsController = asyncHandler(async function(req,res){
  const exploreQuestions = await getExploreQuestions();
  return res.status(200).json({
    status:"success",
    exploreQuestions
  })
})

module.exports = {
  getDaily,
  searchLeetcodeProblems,
  searchQuestionWithTags,
  getTopicTags,
  exploreQuestionsController
};
