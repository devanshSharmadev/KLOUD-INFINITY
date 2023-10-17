import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-ishared-file-view-components',
  templateUrl: './ishared-file-view-components.component.html',
  styleUrls: ['./ishared-file-view-components.component.css']
})

export class IsharedFileViewComponentsComponent implements OnInit {

  fileToDisplay!:any
  contentType!:any
  // NodeBackend='http://10.90.6.199:3000'
  NodeBackend='http://localhost:3000'


  isImage:boolean=false
  isPdf:boolean=false
  isVideo:boolean=false
  isAudio:boolean=false
  isText:boolean=false
  isAnyfile:boolean=false

  TextToDisplay!:any

  tryToUpdate:boolean=false

  fileUpdatingDate!:any
  userToken!:any

  by!:any
  on!:any

  fileName!:any

  fileTodisplaytext!:any
  

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private sanitizer: DomSanitizer,private http:HttpClient) { }

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    console.log(this.data.lastUpdate)

    this.by=this.data.lastUpdate.by
    this.on=this.data.lastUpdate.on

    this.fileName=this.data.fileName
    
    this.contentType=this.data.contentType.split("/"); 
   
    if(this.contentType[0]=="image"){
      this.isImage=true
      this.fileToDisplay=this.sanitizer.bypassSecurityTrustUrl(this.data.dataKey)
    }
    else if(this.contentType[1]=="pdf"){
      this.isPdf=true
      this.fileToDisplay=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.dataKey)
    }
    else if(this.contentType[0]=="video"){
      this.isVideo=true
      this.fileToDisplay=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.dataKey)
    }
    else if(this.contentType[0]=="audio"){
      this.isAudio=true
      this.fileToDisplay=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.dataKey)
    }
    else if(this.contentType[0]=="text"){
      this.isText=true
      console.log(this.data.dataKey)
      // this.fileToDisplay=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.dataKey)
      let textToBeConverted=String(this.data.dataKey).split(",")[1]
      console.log(textToBeConverted)
      let decodedString = atob(textToBeConverted); 
      this.TextToDisplay=decodedString
      console.log(this.TextToDisplay)
      this.fileTodisplaytext=this.sanitizer.bypassSecurityTrustResourceUrl("data:application/octet-stream;base64"+","+btoa(this.TextToDisplay))
      console.log(this.fileTodisplaytext)
 
    }
  
    
    else{
      
      this.isAnyfile=true
      this.fileToDisplay=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.dataKey)
    }


  }

  onChangeTextArea(txt:any){
    
    this.TextToDisplay=txt.target.value
  }

  updateFile(){
    console.log(this.TextToDisplay,this.data.id)

    this.tryToUpdate=false
    var encodedString = btoa(this.TextToDisplay);
    console.log(encodedString);
    let uf="data:application/octet-stream;base64"+","+encodedString
    console.log(uf)
    var today = new Date();
    this.fileUpdatingDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    
    this.http.patch(`${this.NodeBackend}/${this.data.id}`,{file:uf,by:this.userToken.username,on:this.fileUpdatingDate})
    .subscribe(res=>{
     console.log(res)
    },err=>{
      console.log(err)

    })

  }

  changeUpdateState(){
    this.tryToUpdate=true
  }

}
