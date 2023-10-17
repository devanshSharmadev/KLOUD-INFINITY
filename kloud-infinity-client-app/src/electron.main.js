const { app, BrowserWindow } = require('electron');
const path = require('path');
const { stdout } = require('process');
const url = require('url');
const chokidar = require('chokidar');
const events=require('events')
const eventEmitter=new events.EventEmitter()
var fs=require('fs')

const Observer=require('./observer')

var observer=new Observer();

const folder='watch-folder'


var exec=require('child_process').execFile;
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

const createWindow = () => {
    // set timeout to render the window not until the Angular 
    // compiler is ready to show the project
    setTimeout(() => {
        // Create the browser window.
        win = new BrowserWindow({
            width: 1000,
            height: 800,
            icon: './src/favicon.ico'
        });

        // and load the app.
        win.loadURL(url.format({
            pathname: 'localhost:4200',
            protocol: 'http:',
            slashes: true
        }));

        win.webContents
        .executeJavaScript('JSON.parse(localStorage.getItem("User")).username;',true)
        .then(result=>{
            console.log(result)
            userName=result
            if(result.length>0){
                StartWatcher(result)
            }
        })

        // Emitted when the window is closed.
        win.on('closed', () => {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            win = null;
        });
    }, 10000);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
        createWindow();
    }
});

function StartWatcher(path,username){

    console.log(username)
    
    const folderLocation=path

    const watcher = chokidar.watch(folderLocation,{
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
    
    watcher.on('add',async (path) => {
        console.log(path,'File Path ....... for',username)
        var today = new Date();
        var fileAddingDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
        fs.readFile(path,async function(error,data){
            console.log(data)

            eventEmitter.emit('file-added',{
                message:data+" File Path "+path
            })
            
        })
    })
    
    watcher.on('ready',async()=>{
        console.log("I am ready to watch files for ",username)
        console.log(folderLocation)
    })

    console.log("AJJJJJ")

   

    watcher.on('change',async (path)=>{
        console.log(path,'Content change in the file... for',username);
        var today = new Date();
        var fileAddingDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
        fs.readFile(path,async function(error,data){
          console.log(data)
          eventEmitter.emit('file-updated',{
            message:data+" File Path "+path
        })
        })
    })
}

observer.on('file-added',log=>{
    console.log(log.message," File Added ")
})

observer.on('file-updated',log=>{
    console.log(log.message," File Updated ")
})

observer.watchFolder(folder)