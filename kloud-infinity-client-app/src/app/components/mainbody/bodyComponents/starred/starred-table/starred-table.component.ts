import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { FileService } from 'src/app/file.service';
import { Router } from '@angular/router';


export interface File{
  id:string;
  fileName:string;
  starred:boolean;
  thumbnail:string;

}
@Component({
  selector: 'app-starred-table',
  templateUrl: './starred-table.component.html',
  styleUrls: ['./starred-table.component.css']
})
export class StarredTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['thumbnail', 'name', 'controller'];
dataSource2!:MatTableDataSource<File>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
tfiles:File[]=[]
tfiles2:File[]=[]
localItem!:string;
userToken:any
router!:Router

constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer) {  
  // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
  if(localStorage.getItem("User")){
    localStorage.getItem("User")
    this.userToken=JSON.parse(localStorage.getItem("User")!)
  }
      
  this.localItem=localStorage.getItem("files")!
  this.tfiles=JSON.parse(this.localItem) 
  this.tfiles2=this.tfiles.filter(q=>q.starred)
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
onDownload(fileId:string|null){

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
    fileSaver.saveAs(blob, '');
    
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
  const url=`http://localhost:8081/api/${this.userToken.username}/delete/${fileName}`
  this.tfiles.filter(q=>q.fileName!=fileName)
  this.dataSource2 = new MatTableDataSource(this.tfiles); 
  this.http
  .delete(url,{headers:header})
  .subscribe((response)=>{
    console.log(response)
    window.location.reload();
  })
  
}
navigate(fileName:string){
  this.router.navigate(['/viewFile', fileName]); //we can send product object as route param
}

}
