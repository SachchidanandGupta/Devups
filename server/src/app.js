const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const friendRoutes = require("./routes/friends.routes");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);
app.use("/api/user",userRoutes);
app.use("/api/friends",friendRoutes);

app.use(function(err,req,res,next){
    const statusCode = err.statusCode || 500 ;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        message,
        status:"Failed"
    })
})

module.exports = app;
