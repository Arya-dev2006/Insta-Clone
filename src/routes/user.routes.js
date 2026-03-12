const express = require('express');
const userRouter = express.Router();
const followController = require("../controllers/user.controller");
const verifyUser = require('../middleware/auth.middleware');

userRouter.post('/follow/:userid',verifyUser,followController.followCreation);
userRouter.post('/unfollow/:userID',verifyUser,followController.unfollowuser);
userRouter.post('/like/:postId',verifyUser,followController.likePost);
userRouter.post('/accept/:followId',verifyUser,followController.acceptFollow);
module.exports = userRouter;