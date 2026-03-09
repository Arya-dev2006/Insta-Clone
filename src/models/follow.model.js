const mongoose = require("mongoose");


const followSchema = new mongoose.Schema({
    follower:{
        type:String,
    },
    followe:{
        type:String,
    },
   
},{timestamps: true,});

followSchema.index({follower:1 , followe:1}, {unique:true});

const followModel = mongoose.model('follow',followSchema);

module.exports= followModel;