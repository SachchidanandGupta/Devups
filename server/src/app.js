const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const friendRoutes = require("./routes/friends.routes");
const leaderboardRoutes = require("./routes/leaderboard.routes");
const contestRoutes = require("./routes/contest.routes");
const responceNotificationRoutes = require("./routes/responseNotification.routes");
const activityLogRoutes = require("./routes/activityLog.routes");
const leetcodeRoutes = require("./routes/leetcode.routes");
const xpRoutes = require("./routes/xp.routes");
const {errorHandle} = require("./middlewares/error.middleware");
const cors = require("cors");
const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/friends",friendRoutes);
app.use("/api/leaderboard",leaderboardRoutes);
app.use("/api/contest",contestRoutes);
app.use("/api/notifications",responceNotificationRoutes);
app.use("/api/activity",activityLogRoutes);
app.use("/api/leetcode",leetcodeRoutes);
app.use("/api/xp",xpRoutes);
app.use(errorHandle);


module.exports = app;
