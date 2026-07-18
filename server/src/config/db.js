const mongoose = require("mongoose");

function connectToDB (){
  return mongoose.connect(process.env.MONGO_URI).then(()=>{
        console.log("Connected to database")
    }).catch((err)=>{
        console.log("Connection failed",err);
        throw err;
    })
}

module.exports = connectToDB