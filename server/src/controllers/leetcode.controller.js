const asyncHandler  = require("../utils/asyncHandler");
const { getDailyQuestion, getSearchProblems } = require("../services/leetcode.service");
const appError = require("../utils/appError");

const getDaily = asyncHandler(async function (req, res) {
  const daily = await getDailyQuestion();
  if(!daily){
    throw new appError("No daily question data returned",404);
  }
  return res.status(200).json({
    success:true,
    daily
  })
});

const searchLeetcodeProblems = asyncHandler(async function(req,res){
  const {q} = req.query;
  if(!q || q.trim() === "")throw new appError("Search query is required", 400);
  const problems = await getSearchProblems(q);
  return res.status(200).json({
    status: "success",
    problems,
  });
})


module.exports = {
    getDaily,
    searchLeetcodeProblems
}