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
  // NodeBackend='http://10.90.6.199:3000'
  // SpringBackend='http://10.90.6.199:8081/api'
  NodeBackend='http://localhost:3000'
  SpringBackend='http://localhost:8081/api'


  displayedColumns: string[] = ['thumbnail', 'name', 'controller'];
dataSource2!:MatTableDataSource<File>;
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!: MatSort;
tfiles:File[]=[]
tfiles2:File[]=[]
localItem!:string;
userToken:any
router!:Router
thumbnailSrc!:any

constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer) {  
  // const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));
  
  if(localStorage.getItem("User")){
    localStorage.getItem("User")
    this.userToken=JSON.parse(localStorage.getItem("User")!)
  }

  
  this.fileService.getFiles(this.userToken.username)
  .subscribe((files:File[])=>{

    files.forEach((q:any)=>{
      let k=q.contentType.split('/')

      if(k[1]=="javascript"){

        this.thumbnailSrc="../../../../../assets/js.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="pdf"){

        this.thumbnailSrc="../../../../../assets/pdf.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="json"){

        this.thumbnailSrc="../../../../../assets/json.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="xml"){

        this.thumbnailSrc="../../../../../assets/xml.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="zip"){

        this.thumbnailSrc="../../../../../assets/zip.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[0]=="audio"){

        this.thumbnailSrc="../../../../../assets/audio.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[0]=="multipart"){

        this.thumbnailSrc="../../../../../assets/multipart.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="css"){

        this.thumbnailSrc="../../../../../assets/css.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="csv"){
        
        this.thumbnailSrc="../../../../../assets/csv.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="html"){

        this.thumbnailSrc="../../../../../assets/html.png"
        q.thumbnail=this.thumbnailSrc

      }
      else if(k[1]=="plain"){

        this.thumbnailSrc="../../../../../assets/text.png"
        q.thumbnail=this.thumbnailSrc
      }
      else if(k[0]=="video"){

        this.thumbnailSrc="../../../../../assets/video.png"
        q.thumbnail=this.thumbnailSrc
      }
      else if(k[0]=="image"){

        this.thumbnailSrc="../../../../../assets/image.jpeg"
        q.thumbnail=this.thumbnailSrc

      }
      else{

        this.thumbnailSrc="../../../../../assets/file.png"
        q.thumbnail=this.thumbnailSrc

      }
      console.log(k[0])
    })
    
    this.tfiles2=files.filter(q=>q.starred)
    this.tfiles2.sort((a,b) => (a.fileName.toLowerCase() > b.fileName.toLowerCase()) ? 1 : ((b.fileName.toLowerCase() > a.fileName.toLowerCase()) ? -1 : 0))
    this.dataSource2 = new MatTableDataSource(this.tfiles2); 
    
  })
      
  
  
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
  const url=`${this.SpringBackend}/${this.userToken.username}/delete/${fileName}`
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
