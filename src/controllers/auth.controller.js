const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req,res){
   const {username,email,password,bio,profileImage} = req.body;
   const isUserAlreadyExist = await userModel.findOne({
    $or:[
        {username},
        {email},
    ]
   });
  
   if(isUserAlreadyExist){
    return res.send("User Already Exist");
   }
   const hash = await bcrypt.hash(password, 10);
   
   const user = await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password: hash,
   })
   const token = jwt.sign({
    id: user._id,
   },
   process.env.JWT_SECRET,{expiresIn:"1d"}
)
res.cookie("jwt",token);
res.send("USER CREATED SUCCESSFULLY");

}
async function loginController(req,res){
    const {username,email,password} = req.body;
    const isUserExist = await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    });

    if(!isUserExist){
        return res.send("User don't exist");
    }

   const isPasswordCorrect = await bcrypt.compare(password, isUserExist.password);

    if(!isPasswordCorrect){
        return res.send('Wrong password');
    }
    const token = jwt.sign({
        id: isUserExist._id,
    }, process.env.JWT_SECRET,{expiresIn:"1d"});
    res.cookie('token',token);

    res.send("login successful");
}
module.exports = {
    registerController,
    loginController,
};