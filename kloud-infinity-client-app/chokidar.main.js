require("dotenv").config()
var express = require('express');
var router = express.Router();
const http = require('http');
http.createServer().listen(3002); 
var fs=require('fs')
var mongoose=require('mongoose')
var Blob=require('node:buffer');

const chokidar = require('chokidar');

const folderLocation='./src/watch-folder'



const tempFileName=''
// const connection_URL="mongodb+srv://dev007:123@cluster0.i8eqnb9.mongodb.net/?retryWrites=true&w=majority"

const connection_URL="mongodb+srv://dev:123@kloudinfinity.ygpu8us.mongodb.net/?retryWrites=true&w=majority"

const aws=require('aws-sdk')
const multer=require('multer')
const multerS3=require('multer-s3')

aws.config.update({
    secretAccessKey:process.env.ACCESS_SECRET,
    accessKeyId:process.env.ACCESS_KEY,
    region:process.env.REGION
})

const BUCKET=process.env.BUCKET
const userName=process.env.USERNAME
const s3=new aws.S3()

const upload=multer({
    storage:multerS3({
        s3:s3,
        acl:"public-read",
        bucket:BUCKET,
        key:function(req,file,cb){
            console.log(file);
            cb(null,file.filename)
        }
    })
})

mongoose.connect(connection_URL,{useNewUrlParser:true,useUnifiedTopology:true},function(err,result){
  if(err)
  {
    console.log(`Error is: ${err}`)

  }
  else if(result){
    console.log("Connection Successful")
    
  }
})

const syncFileSchema=mongoose.Schema({
    userName:String,
    fileData:String,
    createdOn:String,
    updatedOn:String,
    fileLocation:String,
    fileName:String,
    fileType:String
  })

const SyncFile=mongoose.model('SyncFile',syncFileSchema)

const watcher = chokidar.watch(folderLocation,{
    persistent: false,
    ignoreInitial: true,
    ignored: [ 'watch-folder/ignore-1.txt', 'watch-folder/ignore-2.txt' ],
    ignorePermissionErrors: false,
    interval: 100,
    binaryInterval: 300,
    disableGlobbing: false,
    enableBinaryInterval: true,
    useFsEvents: false,
    usePolling: false,
    atomic: true,
    followSymlinks: true,
    awaitWriteFinish: false
})

watcher.on('ready',async()=>{
    console.log("I am ready to watch files")
    console.log(folderLocation)
})

// Whenever file is added
watcher.on('add',async (path) => {
    console.log(path.split("/")[path.split("/").length-1].split(".")[1],'File Extension .......')
    var fileExtension=path.split("/")[path.split("/").length-1].split(".")[1]
    var fileType=''
   
    var today = new Date();
    var fileAddingDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    const FileCont=fs.readFileSync(path,{encoding:'base64'})

    fs.readFile(path,async function(error,data){
         if(fileExtension=="jpeg" || fileExtension=="jpg" || fileExtension=="png" || fileExtension=="JPEG" || fileExtension=="JPG" || fileExtension=="PNG"){
            const newSynchedFile=new SyncFile({
                userName:userName,
                fileData:"data:application/octet-stream;base64,"+FileCont,
                createdOn:fileAddingDate,
                updatedOn:fileAddingDate,
                fileLocation:path,
                fileName:path.split("/")[path.split("/").length-1],
                fileType:"image"
            })
            try{
                    // console.log("Reached Here...")
                    var buf=Buffer.from(JSON.stringify(newSynchedFile))
    
                    var dataforS3={
                        Bucket:BUCKET,
                        Key:`${userName}/${newSynchedFile.fileName}`,
                        Body:buf,
                        ContentEncoding:'base64',
                        ContentType: 'application/json',
                        ACL: 'public-read'
    
                    }
    
                    s3.upload(dataforS3,function(err,data2){
                        if(err){
                            console.log(err)
                            console.log('Error uploading data: ',data2)
                        }else{
                            console.log('File Successfully update to s3 bucket')
                        }
                    })
    
                    await newSynchedFile.save()
                }
                catch(err){
                    console.log(err)
                }
         }
         else if(fileExtension=="pdf"||fileExtension=="PDF"){
            const newSynchedFile=new SyncFile({
                userName:userName,
                fileData:"data:application/pdf;base64,"+FileCont,
                createdOn:fileAddingDate,
                updatedOn:fileAddingDate,
                fileLocation:path,
                fileName:path.split("/")[path.split("/").length-1],
                fileType:"pdf"
            })
            try{
                    // console.log("Reached Here...")
                    var buf=Buffer.from(JSON.stringify(newSynchedFile))
    
                    var dataforS3={
                        Bucket:BUCKET,
                        Key:`${userName}/${newSynchedFile.fileName}`,
                        Body:buf,
                        ContentEncoding:'base64',
                        ContentType: 'application/json',
                        ACL: 'public-read'
    
                    }
    
                    s3.upload(dataforS3,function(err,data2){
                        if(err){
                            console.log(err)
                            console.log('Error uploading data: ',data2)
                        }else{
                            console.log('File Successfully update to s3 bucket')
                        }
                    })
    
                    await newSynchedFile.save()
                }
                catch(err){
                    console.log(err)
                }
         }
         else if(fileExtension=="mp3"||fileExtension=="MP3"){
            const newSynchedFile=new SyncFile({
                userName:userName,
                fileData:"data:application/octet-stream;base64,"+FileCont,
                createdOn:fileAddingDate,
                updatedOn:fileAddingDate,
                fileLocation:path,
                fileName:path.split("/")[path.split("/").length-1],
                fileType:"audio"
            })
            try{
                    // console.log("Reached Here...")
                    var buf=Buffer.from(JSON.stringify(newSynchedFile))
    
                    var dataforS3={
                        Bucket:BUCKET,
                        Key:`${userName}/${newSynchedFile.fileName}`,
                        Body:buf,
                        ContentEncoding:'base64',
                        ContentType: 'application/json',
                        ACL: 'public-read'
    
                    }
    
                    s3.upload(dataforS3,function(err,data2){
                        if(err){
                            console.log(err)
                            console.log('Error uploading data: ',data2)
                        }else{
                            console.log('File Successfully update to s3 bucket')
                        }
                    })
    
                    await newSynchedFile.save()
                }
                catch(err){
                    console.log(err)
                }
         }
         else if(fileExtension=="mp4"||fileExtension=="MP4"){
            const newSynchedFile=new SyncFile({
                userName:userName,
                fileData:"data:application/octet-stream;base64,"+FileCont,
                createdOn:fileAddingDate,
                updatedOn:fileAddingDate,
                fileLocation:path,
                fileName:path.split("/")[path.split("/").length-1],
                fileType:"video"
            })
            try{
                    // console.log("Reached Here...")
                    var buf=Buffer.from(JSON.stringify(newSynchedFile))
    
                    var dataforS3={
                        Bucket:BUCKET,
                        Key:`${userName}/${newSynchedFile.fileName}`,
                        Body:buf,
                        ContentEncoding:'base64',
                        ContentType: 'application/json',
                        ACL: 'public-read'
    
                    }
    
                    s3.upload(dataforS3,function(err,data2){
                        if(err){
                            console.log(err)
                            console.log('Error uploading data: ',data2)
                        }else{
                            console.log('File Successfully update to s3 bucket')
                        }
                    })
    
                    await newSynchedFile.save()
                }
                catch(err){
                    console.log(err)
                }
         }
         else{
            const newSynchedFile=new SyncFile({
                userName:userName,
                fileData:b64EncodeUnicode(data),
                createdOn:fileAddingDate,
                updatedOn:fileAddingDate,
                fileLocation:path,
                fileName:path.split("/")[path.split("/").length-1],
                fileType:"file"
            })
            try{
                    // console.log("Reached Here...")
                    var buf=Buffer.from(JSON.stringify(newSynchedFile))
    
                    var dataforS3={
                        Bucket:BUCKET,
                        Key:`${userName}/${newSynchedFile.fileName}`,
                        Body:buf,
                        ContentEncoding:'base64',
                        ContentType: 'application/json',
                        ACL: 'public-read'
    
                    }
    
                    s3.upload(dataforS3,function(err,data2){
                        if(err){
                            console.log(err)
                            console.log('Error uploading data: ',data2)
                        }else{
                            console.log('File Successfully update to s3 bucket')
                        }
                    })
    
                    await newSynchedFile.save()
                }
                catch(err){
                    console.log(err)
                }
         }
       
    })
})

// Whenever file is deleted

watcher.on('unlink',async (path)=>{
    console.log(path,"File is removed .....")
})

// Whenever file is changed

watcher.on('change',async (path)=>{
    console.log(path,'Content change in the file');
    var today = new Date();
    var fileAddingDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    fs.readFile(path,async function(error,data){
        const updatedFile2=await SyncFile.findOneAndUpdate({fileLocation:path},{$set:{updatedOn:fileAddingDate,fileData:b64EncodeUnicode(data)}})
        const updatedSynchedFile=new SyncFile({
            userName:updatedFile2.userName,
            fileData:b64EncodeUnicode(data),
            createdOn:updatedFile2.fileAddingDate,
            updatedOn:updatedFile2.createdOn,
            fileLocation:updatedFile2.fileLocation,
            fileName:path.split("/")[path.split("/").length-1],
            fileType:"file"
        })
        await s3.deleteObject({Bucket:BUCKET,Key:`${userName}/${path.split("/")[path.split("/").length-1]}`}).promise()

        var buf=Buffer.from(JSON.stringify(updatedSynchedFile))

                var dataforS3={
                    Bucket:BUCKET,
                    Key:`${userName}/${updatedSynchedFile.fileName}`,
                    Body:buf,
                    ContentEncoding:'base64',
                    ContentType: 'application/json',
                    ACL: 'public-read'

                }

                s3.upload(dataforS3,function(err,data2){
                    if(err){
                        console.log(err)
                        console.log('Error uploading data: ',data2)
                    }else{
                        console.log('File Successfully update to s3 bucket')
                    }
                })

    })
})

// To handle error

watcher.on('error',async (error) =>{
    console.log(error);
})

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
    }));
}

router.get('/',function(req,res){
    res.status(200).json({"msg":"HelloWorld"})
})