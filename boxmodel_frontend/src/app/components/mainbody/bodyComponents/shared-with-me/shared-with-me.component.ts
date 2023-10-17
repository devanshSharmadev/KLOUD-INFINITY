import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

export interface sharedToMeFile{
  id:string;
  fileName:string;
  thumbnail:string;
  sharedFrom:string;
  sharedOn:string;
  file:string;
  contentType:string;
  writeAccess:boolean;
  lastUpdate:{
    by:String,
    on:String
  };

}

export interface ISharedFile{
  id:string
  fromUser:String;
  toUser:[{
    userName:String;
    writeAccess:Boolean;
    date:String;
  }],
  file:{
    fileB:String;
    fileName:String;
    filePath:String;
    contentType:String;
    Starred:String;
    username:String;
  };
  lastUpdate:{
    by:String,
    on:String
  }
  
}

@Component({
  selector: 'app-shared-with-me',
  templateUrl: './shared-with-me.component.html',
  styleUrls: ['./shared-with-me.component.css']
})
export class SharedWithMeComponent implements OnInit {

  // NodeBackend='http://10.90.6.199:3000'
  NodeBackend='http://localhost:3000'


  userToken:any

  sharedFiles!:any

  IMGsrc!:any

  filesSharedToMe:sharedToMeFile[]=[]

  wa!:boolean
  
  dt!:string

  Switcher:boolean=false

  filesIShared:ISharedFile[]=[]

  constructor(private http:HttpClient,private sanitizer: DomSanitizer) {
   
   }

  ngOnInit(): void {

    

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
      
    }

    this.http.get(`${this.NodeBackend}/${this.userToken.username}`)
    .subscribe((res:any)=>

      {
        console.log(res.files)
        res.files.forEach((q:any)=>{
          q.toUser.forEach((p:any)=>{
              if(p.userName==this.userToken.username){
                this.wa=p.writeAccess
                this.dt=p.date
              }
            }
          )

          this.filesSharedToMe.push({
            id:q._id,
            fileName:q.file.fileName,
            thumbnail:this.checkThumbnail(q.file.contentType.split("/")),
            sharedFrom:q.fromUser,
            sharedOn:this.dt,
            file:q.file.fileB,
            contentType:q.file.contentType,
            writeAccess:this.wa,
            lastUpdate:q.lastUpdate


          })
        })

        console.log(this.filesSharedToMe)
        localStorage.setItem("sharedFiles",JSON.stringify(this.filesSharedToMe))
      }
    )

    this.http.get(`${this.NodeBackend}/IShared/${this.userToken.username}`)
    .subscribe((res:any)=>{

      console.log(res.Ifiles)
      this.filesIShared=res.Ifiles
      localStorage.setItem("filesIShared",JSON.stringify(this.filesIShared))

    })

    

  }

    checkThumbnail(fType:any){

      if(fType[1]=="javascript"){
        return "../../../../../../assets/js.png"
      }
      else if(fType[1]=="pdf"){
        return "../../../../../../assets/pdf.png"
      }
      else if(fType[1]=="json"){
        return "../../../../../../assets/json.png"
      }
      else if(fType[1]=="xml"){
        return "../../../../../../assets/xml.png"
      }
      else if(fType[1]=="zip"){
        return "../../../../../../assets/zip.png"
      }
      else if(fType[0]=="audio"){
        return "../../../../../../assets/audio.png"
      }
      else if(fType[0]=="multipart"){
        return "../../../../../../assets/multipart.png"
      }
      else if(fType[1]=="css"){
        return "../../../../../../assets/css.png"
      }
      else if(fType[1]=="csv"){
        return "../../../../../../assets/csv.png"
      }
      else if(fType[1]=="html"){
        return "../../../../../../assets/html.png"
      }
      else if(fType[1]=="plain"){
        return "../../../../../../assets/text.png"
      }
      else if(fType[0]=="video"){
        return "../../../../../../assets/video.png"
      }
      else if(fType[0]=="image"){
        return "../../../../../../assets/image.jpeg"
      }
      else{
        return "../../../../../../assets/file.png"
      }
  
    }

    doIfswitched(event:any){
      this.Switcher=event.checked
    }


}

