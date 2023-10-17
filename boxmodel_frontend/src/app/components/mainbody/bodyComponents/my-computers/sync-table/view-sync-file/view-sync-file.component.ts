import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-sync-file',
  templateUrl: './view-sync-file.component.html',
  styleUrls: ['./view-sync-file.component.css']
})
export class ViewSyncFileComponent implements OnInit {

  fileToDisplay!:any
  userToken!:any
  textToDisplay!:any
  fileTodisplaytext!:any

  filename!:any

  fileType!:any

  isImage:boolean=false
  isPDF:boolean=false
  isVideo:boolean=false
  isAudio:boolean=false
  isFile:boolean=false


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private sanitizer: DomSanitizer,private http:HttpClient) { }

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    this.fileType=this.data.fileType

    if(this.fileType=="image"){
      this.isImage=true
      this.filename=this.data.fileName
      this.fileTodisplaytext=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file)
      
    }
    else if(this.fileType=="pdf"){
      this.isPDF=true
      this.filename=this.data.fileName
      this.fileTodisplaytext=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file)
    }
    else if(this.fileType=="audio"){
      this.isAudio=true
      this.filename=this.data.fileName
      this.fileTodisplaytext=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file)
    }
    else if(this.fileType=="video"){
      this.isVideo=true
      this.filename=this.data.fileName
      this.fileTodisplaytext=this.sanitizer.bypassSecurityTrustResourceUrl(this.data.file)
    }
    else{
      this.isFile=true
      this.fileToDisplay=this.data.file
      let decodedString = atob(this.fileToDisplay); 
      this.textToDisplay=decodedString
      this.filename=this.data.fileName
      this.fileTodisplaytext=this.sanitizer.bypassSecurityTrustResourceUrl("data:application/octet-stream;base64"+","+btoa(this.textToDisplay))
      
    }

   

  }

}
