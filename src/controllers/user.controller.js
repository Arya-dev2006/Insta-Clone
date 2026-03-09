const followModel = require("../models/follow.model");
const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");
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
async function likePost(req,res){
    const postId = req.params.postId;
    console.log(postId);
    const userName = req.user.username;
       const isPost = await postModel.findById(postId);
        console.log(isPost);
        if(!isPost){
            return res.send("post does not exist");
        }
        const alreadyLiked = await likeModel.findOne({
            post: postId,
            username: userName,
        })
        if(alreadyLiked){
            return res.send('already liked the post');
        }
        
        const likes = await likeModel.create({
            post: postId,
            username : userName, 
        })

        res.send(likes)

}
module.exports = {
    followCreation,
    unfollowuser,
    likePost,
};