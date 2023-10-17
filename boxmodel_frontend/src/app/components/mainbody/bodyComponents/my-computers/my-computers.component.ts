import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/file.service';

export interface SyncFile{
  id:string;
  userName:string;
  updatedOn:string;
  fileName:string;
  fileLocation:string;
  fileData:string;
  createdOn:string;
  fileType:string;

  
}


@Component({
  selector: 'app-my-computers',
  templateUrl: './my-computers.component.html',
  styleUrls: ['./my-computers.component.css']
})
export class MyComputersComponent implements OnInit {

  userToken!:any

  syncedFiles:SyncFile[]=[]
  // NodeBackend='http://10.90.6.199:3000'
  NodeBackend='http://localhost:3000'


  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer) { 

   

  }

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }


    this.http.get(`${this.NodeBackend}/syncedFiles/${this.userToken.username}`)
    .subscribe((res:any)=>

      {
        console.log(res.syncedFiles)

        res.syncedFiles.forEach((q:any)=>{

          this.syncedFiles.push({

            id:q._id,
            userName:q.userName,
            updatedOn:q.updatedOn,
            fileName:q.fileName,
            fileLocation:q.fileLocation,
            fileData:q.fileData,
            createdOn:q.createdOn,
            fileType:q.fileType

          })

        })

        console.log(this.syncedFiles)
        localStorage.setItem("syncedfiles",JSON.stringify(this.syncedFiles))

       

      }
    )

   
  }

}
