const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");


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
   const hash = crypto.createHash('sha256').update(password).digest('hex');
   

   const token = jwt.sign({
    id: user._id,
   },
   process.env.JWT_SECRET,{expiresIn:"1d"}
)
res.cookie("jwt",token);
res.send("USER CREATED SUCCESSFULLY");

}
module.exports = {registerController,};