const mongoose = require("mongoose");
const postSchema = new mongoose.Schema({
    caption:{
        type: String,
        default:"",
    },
    imageUrl:{
        type:String,
        required:[true,"give an image"]
    },
    user:{
        ref:"users",
        type:mongoose.Schema.Types.ObjectId,
        required :[true,"id is required to make an post"],
    },
});
const postModel = mongoose.model("posts",postSchema);
module.exports = postModel;