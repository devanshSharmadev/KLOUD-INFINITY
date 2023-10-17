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
import { last } from 'rxjs';
import {DeleteConfirmComponent} from '../delete-confirm/delete-confirm.component'
import { MatDialog } from '@angular/material/dialog';


export interface File{
  id:string;
  fileName:string;
  starred:boolean;
  thumbnail:string;
  uploadDate:string

}

/** Constants used to fill up our data base. */

@Component({
  selector: 'app-table-component',
  templateUrl: './table-component.component.html',
  styleUrls: ['./table-component.component.css']
})
export class TableComponentComponent implements AfterViewInit {

  displayedColumns: string[] = ['thumbnail', 'name','uploadDate', 'controller'];

  // SpringBackend='http://10.90.6.199:8081/api'
  SpringBackend='http://localhost:8081/api'


  dataSource2!:MatTableDataSource<File>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  tfiles:File[]=[]
  localItem!:string;
  userToken:any

  router!:Router

  dateToSend!:any

  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer,private toast: NgToastService,public dialog: MatDialog) {  
    // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }
        

    this.localItem=localStorage.getItem("files")!
    this.tfiles=JSON.parse(this.localItem) 
    
    this.tfiles.sort((a,b) => (a.fileName.toLowerCase() > b.fileName.toLowerCase()) ? 1 : ((b.fileName.toLowerCase() > a.fileName.toLowerCase()) ? -1 : 0))


    // console.log(this.tfiles)
  // Assign the data to the data source for the table to render
  this.dataSource2 = new MatTableDataSource(this.tfiles); 
  
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

  onDownload(fileId:string|null,fileName:string|null){
  
    console.log(fileId)
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    this.fileService.downloadFile(this.userToken.username,fileId!).subscribe((response: any) => { 
      let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
      const url = window.URL.createObjectURL(blob);
      console.log(blob)
      // window.open(url);
      fileSaver.saveAs(blob, fileName!);
      
    }), (error: any) => console.log('Error downloading the file'), 
                 () => console.info('File downloaded successfully');
    
  }

  onDelete(fileName:string|null){
    // console.log(fileId, typeof(fileId))
    // JSON.stringify(fileId)
    // console.log(fileId,typeof(fileId))
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    const url=`${this.SpringBackend}/${this.userToken.username}/delete/${fileName}`

    this.tfiles.filter(q=>q.fileName!=fileName)
    this.dataSource2 = new MatTableDataSource(this.tfiles); 

    this.http
    .delete(url,{headers:header})
    .subscribe((response)=>{
      console.log(response)
      this.toast.success({detail:"SUCCESS",summary:'File deleted',duration:5000});
      window.location.reload();
    })
    
  }

  onAccess(fileName:string){

    console.log("This row is clicked....",fileName)

    // 2022/06/14 12:57:01
    const newDate=new Date()

    let year=String(newDate.getFullYear())
    let month=String(newDate.getMonth()+1)
    let day=String(newDate.getDate())
    let hour=String(newDate.getHours())
    let minute=String(newDate.getMinutes())
    let second=String(newDate.getSeconds())

    if(month.length==1){
      month="0"+month
    }
    else if(day.length==1){
      day="0"+day
    }
    else if(hour.length==1){
      hour="0"+hour
    }
    else if(minute.length==1){
      minute="0"+minute
    }
    else if(second.length==1){
      second="0"+second
    }
    
    this.dateToSend=year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second

    this.fileService.setLastModification(fileName,this.dateToSend)
    .subscribe((res:any)=>{
      console.log(res)
    })

    
    
  }

  navigate(fileName:string){

    let newAccessedDate=new Date()
    this.router.navigate(['/viewFile', fileName]); //we can send product object as route param
  }

  openDialog(fileName:string) {
    this.dialog.open(DeleteConfirmComponent,{
      data: {
        fileName:fileName
      }
    });
  }
  

}
