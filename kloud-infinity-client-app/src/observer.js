const chokidar=require('chokidar')
const EventEmitter=require('events').EventEmitter
const fsExtra=require('fs-extra')
class Observer extends EventEmitter{
    constructor(){
        super()
    }

    watchFolder(folder){
        try{
            console.log("Watching for",folder)

            var watcher=chokidar.watch(folder,{
                persistent: true,
                ignoreInitial: false,
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

            watcher.on('add',async filePath=>{
                console.log("File added @ ",filePath)
                var fileContent=await fsExtra.readFile(filePath)
                this.emit('file-added',{
                    message:fileContent.toString()
                })
              
            })

            watcher.on('change',async (path)=>{
                console.log(path,'Content change in the file... for',username);
                var fileContent=await fsExtra.readFile(path)
                this.emit('file-updated',{
                    message:fileContent.toString()
                })
            })


        }catch(error){
            console.log(error)
        }
    }
}

module.exports=Observer