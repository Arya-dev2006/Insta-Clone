const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username : {
        type: String,
        unique : [true,"username already exsist"],
        required :[ true, "username required"],
    },
    email :{
        type: String,
        unique :[true,"email already exsist"],
        required : [true,"email required"],
    },
    password :{
        type: String,
        required :[true,"password required"],
    },
    bio :{
        type: String,
    },
    profileImage: {
        type: String,
        default: "abcd.jpg",
    }
});

const userModel = mongoose.model("users",userSchema);
module.exports = userModel;