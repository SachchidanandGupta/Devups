const friendModel = require("../models/friends.model")
const userModel = require("../models/user.model");
const appError = require("../utils/appError");
const asyncHandler = require("../utils/asyncHandler");

const getGlobalLeaderboard = asyncHandler(async function(req,res){
    const userId = req.user.id;
    if(!userId){
        throw new appError("unauthorized access",401);
    }
    const globalLeaderboard = await userModel.find({}).sort({xp:-1}).limit(100).select("username avatar xp level streak");
    res.status(200).json({
        message:"top 100 on leaderboard fetched",
        status:"success",
        globalLeaderboard
    })
});

const getFriendLeaderBoard = asyncHandler(async function(req,res){
    const userId = req.user.id;
    if(!userId){
        throw new appError("unauthorized access",401)
    }
    const friendShips = await friendModel.find({
        status:"accepted",
        $or:[
            {receiver:userId},
            {requester:userId}
        ]
    });

    const friendIds = friendShips.map((friendShip)=>{
        return friendShip.requester.toString() === userId.toString() ? friendShip.receiver : friendShip.requester
    });
    friendIds.push(userId);

   const friendLeaderboard = await userModel.find({
      _id:{$in:friendIds}
   }).sort({xp:-1}).select("username avatar xp level streak");

   res.status(200).json({
    message:"friend leaderbord is here",
    status:"success",
    friendLeaderboard
   })

})

module.exports = {
    getGlobalLeaderboard,
    getFriendLeaderBoard
}