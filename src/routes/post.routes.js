const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const postRouter = express.Router();
const postController = require("../controllers/post.controller")

postRouter.post('/',upload.single('image'),postController.postCreate);
postRouter.get('/',postController.getPost);
postRouter.get('/details/:postID',postController.postDetails);
module.exports = postRouter;