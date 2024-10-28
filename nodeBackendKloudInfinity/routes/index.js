var express = require('express');
var mongoose=require('mongoose');
var router = express.Router();

/* GET home page. */

const connection_URL=""

mongoose.connect(connection_URL,{useNewUrlParser:true,useUnifiedTopology:true},function(err,result){
  if(err)
  {
    console.log(`Error is: ${err}`)

  }
  else if(result){
    console.log("Connection Successful")
    
  }
})

const sharedFileSchema=mongoose.Schema({
  fromUser:String,
  toUser:String,
  file:{
    fileB:String,
    fileName:String,
    filePath:String,
    contentType:String,
    Starred:String,
    username:String,
    date:String
  }
})

const SharedFile=mongoose.model('SharedFile',sharedFileSchema)

router.get('/', async function(req,res){ 

  // Setting up Cors //

  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

  // Main Program
  res.status(200).json({"msg":"Hello Devansh"})

  });

router.post('/',async function(req,res){

  // Setting up Cors //
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 

  //Main Program
  const data=req.body
  console.log(data)

  const newSharedFile=new SharedFile({
    fromUser:data.fromUser,
    toUser:data.toUser,
    file:{
      fileB:data.binaryFile,
      fileName:data.fileName,
      filePath:data.filePath,
      contentType:data.fileContentType,
      Starred:data.fileisStarred,
      username:data.fileUserName,
      date:data.fileSharingDate
    }

  })

  try{
    console.log("Reached Here...")
    await newSharedFile.save()
    res.status(201).json(newSharedFile)
    }
    catch(err){
        res.status(409).json({message: err.message})
    }
    
    })
    
module.exports = router;
