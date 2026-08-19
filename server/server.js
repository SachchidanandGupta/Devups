const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");
require("dotenv").config();
const app = require("./src/app");
const connectToDB = require("./src/config/db");
const { startStreakSync } = require("./src/jobs/syncStreak.job");
const { startLeetcodeSync } = require("./src/jobs/syncLeetcode.job");
const { startCodeforcesSync } = require("./src/jobs/syncCodeForces.job");
const { startGithubSync } = require("./src/jobs/syncGithub.job");
const {
  startContestSync,
  startActiveContestSync,
} = require("./src/jobs/completeExpiredContests.job");
const {
  startCodeforcesRatingSync,
} = require("./src/jobs/codeforcesRating.cron");
const http = require("http");
const { intializeSocket } = require("./src/config/socket");
const server = http.createServer(app);
connectToDB();
startStreakSync();
startLeetcodeSync();
startCodeforcesSync();
startGithubSync();
startContestSync();
startActiveContestSync();
startCodeforcesRatingSync();
intializeSocket(server);

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});
