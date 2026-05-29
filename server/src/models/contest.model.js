const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"An creator for contest is require"]
    },
    participants:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    startTime:{
        type:Date,
        required:[true,"Start date is required"]
    },
    endTime:{
        type:Date,
        required:[true,"Start date is required"]
    },
    status:{
        type:String,
        enum:[
            "pending","active","completed"
        ],
        default:"pending"
    },
    winner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    scores:[
        {
            userId:mongoose.Schema.Types.ObjectId,
            xpEarned:Number
        }
    ]
},{
    timestamps:true
});

contestSchema.index({ creator: 1 });
contestSchema.index({ participants: 1 });
contestSchema.index({ status: 1 });
const contestModel = mongoose.model("Contest",contestSchema);

module.exports = contestModel;