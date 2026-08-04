const { Server } = require("socket.io");
const appError = require("../utils/appError");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
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
  io.use((socket, next) => {
    const rawCookie = socket.handshake.headers.cookie;
    if (!rawCookie) return next(new Error("Token not provided"));
    const parsed = cookie.parseCookie(rawCookie);
    const token = parsed.token;
    if (!token) return next(new Error("Token not provided"));

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.data.userId = decoded.id;
      next();
    } catch (err) {
      next(new Error("invalid token"));
    }
  });
  io.on("connection", (socket) => {
    console.log("user is connected", socket.id);
    socket.on("disconnect", () => {
      const userId = socket.data.userId;
      const sockets = onlineUsers.get(userId);
      if (sockets) {
        sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
          io.emit("user:offline", userId);
        }
      }
      console.log("User disconnected", socket.id);
    });
    socket.on("join_room", () => {
      const userId = socket.data.userId;
      if (!onlineUsers.has(userId)) onlineUsers.set(userId, new Set());
      onlineUsers.get(userId).add(socket.id);
      socket.join(userId);
      const sockets = onlineUsers.get(userId);
      if (sockets.size === 1) {
        io.emit("user:online", userId);
      }
      console.log(`User ${userId} joined room ++++++++ `);
    });

    socket.on("join_contest", (contestId) => {
      socket.join(`contest:${contestId}`);
    });

    socket.on("leave_contest", (contestId) => {
      socket.leave(`contest:${contestId}`);
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

function isUserOnline(userId) {
  if (onlineUsers.has(userId)) return true;
  return false;
}

module.exports = {
  intializeSocket,
  getIo,
  isUserOnline,
};
