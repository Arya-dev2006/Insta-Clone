const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
async function followCreation(req,res){

const followerName = req.user.username;
const followeId = req.params.userid;


const isValidAccount = await userModel.findById(followeId);
 if(!isValidAccount){
    return res.send('user does not exist');
 }
if(isValidAccount.username === followerName){
    return res.send("you cant follow yourself dumb shit!");
}
const alreadyFollow = await followModel.findOne({
    follower:followerName,
    followe:isValidAccount.username,
})
if(alreadyFollow){
   return res.send("allready following");
}

const follow = await followModel.create({
    follower: followerName,
    followe: isValidAccount.username,
})

res.send(follow);

};
async function unfollowuser(req,res){
    const id = req.params.userID;
    const userName = req.user.username;
    const isVaildUser = await userModel.findById(id);
    console.log(id);
    if(!isVaildUser){
        return res.send("user does not exist");
    }

    const following = await followModel.findOne({
        follower: userName,
        followe: isVaildUser.username,
    })
    
    console.log(following);
    if(!following){
        return res.send("not follwing");
    }
    const newFollower = await followModel.findByIdAndDelete(following._id);
    res.send("unfollowed");

}

module.exports = {
    followCreation,
    unfollowuser,
};