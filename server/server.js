require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const {startStreakSync} = require("./src/jobs/syncStreak.job");
const {startLeetcodeSync} = require("./src/jobs/syncLeetcode.job");
const http = require("http");
const {intializeSocket} = require("./src/config/socket");
const server = http.createServer(app);
connectToDB();
startStreakSync();
startLeetcodeSync();
intializeSocket(server);

server.listen(3000,()=>{
    console.log("Server is running at port: 3000")
})