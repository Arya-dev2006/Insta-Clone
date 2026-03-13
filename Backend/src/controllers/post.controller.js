const ImageKit= require("@imagekit/nodejs");
const  { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function postCreate(req,res){
   
  const result =  await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'image',
});
    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: result.url,
        user:req.user.id,
    });
    console.log(post);
    res.send("post created")
}

async function getPost(req,res){
   
    const post = await postModel.find({
        user:req.user.id,
    });
    res.send(post);
}

async function postDetails(req,res){
    
    const postID = req.params.postID;
    const userId = req.user.id;
    const post = await postModel.findById(postID);
    if(!post){
       return res.send("post not available");
    }
    const validID = userId === post.user.toString();
    if(!validID){
       return res.send("unotherized access to the post that does not belongs to you!")
    }
    res.send(post)
}
module.exports ={
    postCreate,
    getPost,
    postDetails,
}