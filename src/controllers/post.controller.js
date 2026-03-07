const ImageKit= require("@imagekit/nodejs");
const  { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");
const postModel = require("../models/post.model");
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function postCreate(req,res){
    const token = req.cookies.jwt;
    let isValidUser = null;
    try{
     isValidUser = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch (error){
        return res.send("Unotherized Access");
    }
  const result =  await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'image',
});
    const post = await postModel.create({
        caption: req.body.caption,
        imageUrl: result.url,
        user:isValidUser.id,
    });
    console.log(post);
    res.send("post created")
}

async function getPost(req,res){
    const token = req.cookies.jwt;
    let isValidUser = null;
    try{
     isValidUser = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch (error){
        return res.send("Unotherized Access");
    }
    const post = await postModel.find({
        user:isValidUser.id,
    });
    res.send(post);
}

async function postDetails(req,res){
    const token = req.cookies.jwt;
    let isValidUser =null;
    try{
        isValidUser  = jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(err){
       return res.send("unotherized access");
    }
    const postID = req.params.postID;
    const userId = isValidUser.id;
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