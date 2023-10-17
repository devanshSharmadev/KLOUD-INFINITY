import { Component, OnInit } from '@angular/core';
import {File} from '../../../../model/files'
import {FileService} from '../../../../file.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageThumbnail } from 'src/app/model/imageThumbnail';


@Component({
  selector: 'app-starred',
  templateUrl: './starred.component.html',
  styleUrls: ['./starred.component.css']
})
export class StarredComponent implements OnInit {
  // NodeBackend='http://10.90.6.199:3000'
  NodeBackend='http://localhost:3000'


  tfiles:File[]=[]
  files:File[]=[]
  file?:File
  localItem!:string;
  fileId!:object
  isSearch=false
  UFile:any
  userToken:any
  base64IMGG:any
  
  thumbnailSrc:any=""
  ImageThumbnails!:ImageThumbnail


  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    

    this.localItem=localStorage.getItem("files")!
    this.tfiles=JSON.parse(this.localItem) 
   
    this.files=this.tfiles.filter(q=>q.starred==true)

    
    
  }

}
