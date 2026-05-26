require("dotenv").config();
const app = require("./src/app");

const connectToDB = require("./src/config/db");
const {startStreakSync} = require("./src/jobs/syncStreak.job");
const {startLeetcodeSync} = require("./src/jobs/syncLeetcode.job");

connectToDB();
startStreakSync();
startLeetcodeSync();

app.listen(3000,()=>{
    console.log("Server is running at port: 3000")
})