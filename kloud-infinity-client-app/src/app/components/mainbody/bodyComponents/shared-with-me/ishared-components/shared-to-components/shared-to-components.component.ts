import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { HttpClient, HttpHeaders } from '@angular/common/http';
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

export interface userList{
  userName:string;
  date:string;
  writeAccess:boolean;
  
  
}

@Component({
  selector: 'app-shared-to-components',
  templateUrl: './shared-to-components.component.html',
  styleUrls: ['./shared-to-components.component.css']
})
export class SharedToComponentsComponent implements OnInit {

  displayedColumns: string[] = ['userName', 'writeAccess', 'date'];
  dataSource2!:MatTableDataSource<userList>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userList!:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer,private toast: NgToastService,public dialog: MatDialog) { }

  ngOnInit(): void {

    console.log(this.data)
    this.userList=this.data.userList
    this.dataSource2 = new MatTableDataSource(this.userList); 

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

  toggleChangesForUpdate(event:any,userName:any){
    console.log(event.checked,this.data.id)

    this.http.patch(`http://localhost:3000/updateWriteAccess`,{st:userName,fid:this.data.fileId,nuv:event.checked})
    .subscribe(res=>{
     console.log(res)
    },err=>{
      console.log(err)

    })


  }

}
