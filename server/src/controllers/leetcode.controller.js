const asyncHandler  = require("../utils/asyncHandler");
const { getDailyQuestion } = require("../services/leetcode.service");
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


module.exports = {
    getDaily
}