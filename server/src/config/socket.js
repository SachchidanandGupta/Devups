const { Server } = require("socket.io");
const appError = require("../utils/appError");

let io;
const onlineUsers = new Map();
function intializeSocket(server) {
  io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ["GET", "POST"],
      credentials: true,
    },
  });
  io.on("connection", (socket) => {
    
    console.log("user is connected", socket.id);
    socket.on("disconnect", () => {
      onlineUsers.delete(socket.data.userId);
      io.emit("user:offline",socket.data.userId);
      console.log("User disconnected", socket.id);
    });
    socket.on("join_room", (userId) => {
      socket.data.userId = userId
      onlineUsers.set(userId,socket.id)
      socket.join(userId);
      io.emit("user:online",userId)
      console.log(`User ${userId} joined room `);
    });
  });
  return io;
}
function getIo() {
  if (!io) {
    throw new appError("Socket.io has not been initialized", 500);
  }
  return io;
}

function isUserOnline(userId){
  if(onlineUsers.has(userId))return true;
  return false;
}

module.exports = {
  intializeSocket,
  getIo,
  isUserOnline
};
