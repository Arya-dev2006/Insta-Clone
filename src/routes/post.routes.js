const express = require("express");
const multer = require("multer");
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const verifyUser = require("../middleware/auth.middleware")

postRouter.post('/',upload.single('image'),verifyUser,postController.postCreate);
postRouter.get('/',verifyUser,postController.getPost);
postRouter.get('/details/:postID',verifyUser,postController.postDetails);
module.exports = postRouter;