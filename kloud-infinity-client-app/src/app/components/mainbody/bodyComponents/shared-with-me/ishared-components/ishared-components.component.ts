import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { FileService } from 'src/app/file.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog } from '@angular/material/dialog';
import {IsharedFileViewComponentsComponent} from './ishared-file-view-components/ishared-file-view-components.component'
import {SharedToComponentsComponent} from './shared-to-components/shared-to-components.component'

export interface Isharedfiles{
  id:string;
  fromUser:String;
  fileName:string;
  thumbnail:string;
  sharedFrom:string;
  file:string;
  contentType:string;
  toUser:[{
    userName:String;
    writeAccess:Boolean;
    date:String;
  }];
  lastUpdate:{
    by:String,
    on:String
  }
  

}


@Component({
  selector: 'app-ishared-components',
  templateUrl: './ishared-components.component.html',
  styleUrls: ['./ishared-components.component.css']
})
export class ISharedComponentsComponent implements OnInit {

  displayedColumns: string[] = ['thumbnail', 'name', 'sharedTo','controller'];
  dataSource2!:MatTableDataSource<Isharedfiles>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tfiles:any[]=[]
  tfiles2:Isharedfiles[]=[]
  localItem!:string;
  userToken:any
  router!:Router

  fileType!:any

  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer,private toast: NgToastService,public dialog: MatDialog) {
    
    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    this.localItem=localStorage.getItem("filesIShared")!
    this.tfiles=JSON.parse(this.localItem)
    console.log(this.tfiles)
    this.tfiles.forEach((q:any)=>{

      this.tfiles2.push({
        id:q._id,
        fromUser:q.fromUser,
        fileName:q.file.fileName,
        thumbnail:this.checkThumbnail(q.file.contentType.split("/")),
        sharedFrom:q.fromUser,
        file:q.file.fileB,
        contentType:q.file.contentType,
        toUser:q.toUser,
        lastUpdate:q.lastUpdate
        

      })

    })

    console.log(this.tfiles2)
    this.tfiles2.sort((a,b) => (a.fileName.toLowerCase() > b.fileName.toLowerCase()) ? 1 : ((b.fileName.toLowerCase() > a.fileName.toLowerCase()) ? -1 : 0))
    this.dataSource2 = new MatTableDataSource(this.tfiles2);

   }

   ngAfterViewInit(): void {
    this.dataSource2.paginator = this.paginator;
    this.dataSource2.sort = this.sort;
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource2.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource2.paginator) {
        this.dataSource2.paginator.firstPage();
      }
    }

    openDialog(viewId:string,contentType:string,id:string,lastUpdate:string,fileName:string) {
      const dialogRef = this.dialog.open(IsharedFileViewComponentsComponent,{
        data: {
          dataKey: viewId,
          contentType:contentType,
          id:id,
          lastUpdate:lastUpdate,
          fileName:fileName
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

    openDialog2(userList:any,fileId:any) {
      console.log(fileId)
    
      const dialogRef = this.dialog.open(SharedToComponentsComponent,{
        data: {
          userList: userList,
          fileId:fileId,
          
        }
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }
  
    onDelete(viewId:string){
      this.http.delete(`http://localhost:3000/${viewId}`)
      .subscribe((res)=>{
        console.log(res)
      })
    }

  

  ngOnInit(): void {
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

}
