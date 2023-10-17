
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
import {SharedFileViewComponentComponent} from './shared-file-view-component/shared-file-view-component.component'

export interface sharedToMeFile{
  id:string;
  fileName:string;
  thumbnail:string;
  sharedFrom:string;
  sharedOn:string;
  file:string;
  contentType:string;
  writeAccess:boolean;
}

@Component({
  selector: 'app-shared-files-table',
  templateUrl: './shared-files-table.component.html',
  styleUrls: ['./shared-files-table.component.css']
})
export class SharedFilesTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['thumbnail', 'name', 'sharedBy','sharedOn','controller'];
  dataSource2!:MatTableDataSource<sharedToMeFile>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tfiles:any[]=[]
  tfiles2:sharedToMeFile[]=[]
  localItem!:string;
  userToken:any
  router!:Router

  fileType!:any

  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer,private toast: NgToastService,public dialog: MatDialog) { 

    
    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    this.localItem=localStorage.getItem("sharedFiles")!
    this.tfiles2=JSON.parse(this.localItem) 
    
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

  openDialog(viewId:string,contentType:string,id:string,writeAccess:boolean,lastUpdate:any,fileName:any) {
    const dialogRef = this.dialog.open(SharedFileViewComponentComponent,{
      data: {
        dataKey: viewId,
        contentType:contentType,
        id:id,
        writeAccess:writeAccess,
        lastUpdate:lastUpdate,
        fileName:fileName
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
