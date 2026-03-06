const ImageKit= require("@imagekit/nodejs");
const  { toFile } = require("@imagekit/nodejs");
const client = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY, 
});

async function postCreate(req,res){
    console.log(req.body);
    console.log(req.file);
   const file = await client.files.upload({
  file: await toFile(Buffer.from(req.file.buffer), 'file'),
  fileName: 'image',
});
res.send(file);
}

module.exports ={
    postCreate,
}