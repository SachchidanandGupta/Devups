const {Server} = require("socket.io");
const appError = require("../utils/appError");

 let io;
function intializeSocket(server){
       io = new Server(server,{
         cors: {
  origin: process.env.CLIENT_URL,
  methods: ["GET", "POST"],
  credentials: true
}
    });
    io.on("connection",(socket)=>{
        console.log("user is connected",socket.id);
        socket.on("disconnect",()=>{
            console.log("User disconnected",socket.id);
        });
        socket.on("join_room",(userId)=>{
            socket.join(userId);
            console.log(`User ${userId} joined room `);
        })
    });
    return io;
}
function getIo(){
    if(!io){
        throw new appError("Socket.io has not been initialized",500);
    }
    return io;
}

module.exports = {
    intializeSocket,
    getIo
}