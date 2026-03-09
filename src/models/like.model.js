const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema({
    post:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"posts",
    },
    username:{
        type:String,
    },
},{timestamps:true});

likeSchema.index({post:1, username:1},{unique:true});

const likeModel = mongoose.model("likes",likeSchema);
module.exports=likeModel;
