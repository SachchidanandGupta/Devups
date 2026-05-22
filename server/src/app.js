const express = require("express");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/user.routes");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth",authRoutes);

app.use(function(err,req,res,next){
    const statusCode = err.statusCode || 500 ;
    const message = err.message || "Internal server error";
    return res.status(statusCode).json({
        message,
        status:"Failed"
    })
})

module.exports = app;
