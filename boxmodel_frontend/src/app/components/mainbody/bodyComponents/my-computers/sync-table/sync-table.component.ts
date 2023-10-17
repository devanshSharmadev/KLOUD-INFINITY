import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { FileService } from 'src/app/file.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { window } from 'rxjs';

import {ViewSyncFileComponent} from './view-sync-file/view-sync-file.component'

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
  selector: 'app-sync-table',
  templateUrl: './sync-table.component.html',
  styleUrls: ['./sync-table.component.css']
})
export class SyncTableComponent implements AfterViewInit {

  // NodeBackend='http://10.90.6.199:3000'
  NodeBackend='http://localhost:3000'

  displayedColumns: string[] = ['fileName','fileLocation', 'createdOn', 'updatedOn','controller'];
  dataSource2!:MatTableDataSource<SyncFile>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userToken!:any

  syncedFiles:SyncFile[]=[]

  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer,private toast: NgToastService,public dialog: MatDialog) { 

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
        this.dataSource2 = new MatTableDataSource(this.syncedFiles); 

      }
    )

  }

  ngOnInit(): void {
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

  onDelete(idFile:any,fileName:any){
    this.http.delete(`${this.NodeBackend}/syncedFiles/delete/${idFile}/${fileName}/${this.userToken.username}`)
    .subscribe((res)=>{
      console.log(res)
    })
    this.syncedFiles=this.syncedFiles.filter((q)=>q.id!=idFile)
    this.dataSource2 = new MatTableDataSource(this.syncedFiles); 
    this.toast.success({detail:"SUCCESS",summary:`File Deleted`,duration:5000});
  }

  openDialog(file:any,fileName:any,fileType:any){

    const dialogRef = this.dialog.open(ViewSyncFileComponent,{
      data: {
        file: file,
        fileName:fileName,
        fileType:fileType
      }
    });

    dialogRef.afterClosed().subscribe((result:any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
