const { getIo } = require("../config/socket");

function handleSocket(userId=null,data=null,eventName){
    try{
        const io = getIo();
        if(userId){
            io.to(userId).emit(eventName,data);
        }else{
            io.emit(eventName,data);
        }
    }catch(err){
        console.error("Socket emit failed:", err.message);
    }
    return;

}

function emitXPUpdate(userId, data) {
   handleSocket(userId,data,"xp:updated");
}

function emitLeaderboardUpdate(data) {
  handleSocket(null,data,"leaderboard:refresh");
}

function emitContestReminder(data) {
 handleSocket(null,data,"contest:reminder");
}

function emitFriendActivity(userId, data) {
 handleSocket(userId,data,"friend:activity");
}


module.exports = {
    emitXPUpdate,
    emitLeaderboardUpdate,
    emitContestReminder,
    emitFriendActivity  
}