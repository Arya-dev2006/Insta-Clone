const jwt = require("jsonwebtoken");
async function verifyUser(req,res,next){
const token = req.cookies.jwt;
    let isValidUser =null;
    try{
        isValidUser  = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
       return res.send("unotherized access");
    }
    req.user = isValidUser;
    next();
}
module.exports = verifyUser;

    