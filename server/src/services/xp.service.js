const XP_VALUES = {
  solve_easy: 5,
  solve_medium: 15,
  solve_hard: 35,
  contest_participation: 10,
  contest_top25: 25,
  contest_top10: 50,
  github_commit: 2,
  github_pr: 10,
  daily_streak: 5
}

const xpEventModel = require("../models/xpEvent.model");
const userModel = require("../models/user.model")

function calculateLevel(xp) {
  return Math.floor(xp / 100) + 1
}
async function awardXP(userId,source,action,metaData={}){

    const amount = XP_VALUES[action];
    if(!amount){
        throw new Error("InValid action" + action)
    }
  
    const xpEvent = await xpEventModel.create({
        userId,action,source,amount,metaData
    })

    const updatedUser = await userModel.findByIdAndUpdate(
  userId,
  { $inc: { xp: amount } },
  { returnDocument: "after" }
)

const newLevel = calculateLevel(updatedUser.xp)
if(newLevel !== updatedUser.level) {
  await userModel.findByIdAndUpdate(userId, { level: newLevel })
  updatedUser.level = newLevel
}
return {
  xpEvent,
  user: {
    id: updatedUser._id,
    xp: updatedUser.xp,
    level: updatedUser.level
  }
}
}

module.exports = {awardXP}