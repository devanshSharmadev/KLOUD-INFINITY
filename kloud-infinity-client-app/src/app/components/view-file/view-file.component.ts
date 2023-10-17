import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,ParamMap, Params } from '@angular/router';
import { FileService } from 'src/app/file.service';
import {switchMap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {File} from '../../model/files';
import { DomSanitizer} from '@angular/platform-browser';
import * as fileSaver from 'file-saver';
import { MatDialog } from '@angular/material/dialog';
import {ShareCompoComponent} from './share-compo/share-compo.component'
@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {


  fileDetails?:File
  constructor(private route:ActivatedRoute,private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer,public dialog: MatDialog) { }

  valuefromR!:string
  isImage:boolean=false
  IMGsrc:any
  controllerSrc: any;
  userToken:any
  panelOpenState = false;
  fileSize:any;
  selectedFileBLOB:any
  isPDF:boolean=false
  isVideo:boolean=false
  isAudio:boolean=false
  anyElseFile:boolean=false
  file:any;
  starStatus!:boolean
  FILEsrc:any

  binaryFile!:any

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    this.route.params.subscribe(
      (params: Params) => {
        this.valuefromR=params['fileName']
        console.log(params['fileName'])
      }
    )

    this.fileService.searchFiles(this.valuefromR)
    .subscribe((file:File)=>{
      this.fileDetails=file
      var splitted = file.contentType.split("/"); 
      this.starStatus=file.starred
      if(splitted[0]=="image"){
        this.isImage=true
        var blob:any
        this.fileService.downloadFile(this.userToken.username,file.id).subscribe((response: any) => { 
          console.log(response)
          this.fileSize=response.size
          blob = new Blob([response])
          this.IMGsrc = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
          var reader = new FileReader();
          reader.readAsDataURL(blob); 
          reader.onload = (_event) =>{
            this.IMGsrc=this.sanitizer.bypassSecurityTrustUrl(String(reader.result))
            this.file=this.IMGsrc
            localStorage.setItem("BinaryFile",JSON.stringify(this.IMGsrc.changingThisBreaksApplicationSecurity))
            
          }   
       
        }), (error: any) => console.log('Error Viewing the file'), 
                  () => console.info('File Viewed successfully');
      }

      else if(splitted[1]=="pdf"){
        this.isPDF=true
        var blob:any
        this.fileService.downloadFile(this.userToken.username,file.id).subscribe((response: any) => { 
          console.log(response)
          this.fileSize=response.size
          blob = new Blob([response],{type:'application/pdf'})
          let fileURL=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob))
          this.selectedFileBLOB=fileURL
          this.file=this.selectedFileBLOB
          
          
          var reader=new FileReader()
          reader.readAsDataURL(blob)
          reader.onload=(_event)=>{
            localStorage.setItem("BinaryFile",JSON.stringify(reader.result))
            this.binaryFile=this.sanitizer.bypassSecurityTrustResourceUrl(String(reader.result))
          
          }
          

        }), (error: any) => console.log('Error Viewing the file'), 
                    () => console.info('File Viewed successfully');

      }

      else if(splitted[0]=="video"){
        this.isVideo=true
        var blob:any
        this.fileService.downloadFile(this.userToken.username,file.id).subscribe((res:any)=>{
          console.log(res)
          this.fileSize=res.size
          blob=new Blob([res],{type:'video/mp4'})
          let fileURL:any=this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
          console.log(fileURL.changingThisBreaksApplicationSecurity)
          this.selectedFileBLOB=this.sanitizer.bypassSecurityTrustUrl(fileURL.changingThisBreaksApplicationSecurity)
          this.file=this.selectedFileBLOB

          var reader=new FileReader()
          reader.readAsDataURL(blob)
          reader.onload=(_event)=>{
            localStorage.setItem("BinaryFile",JSON.stringify(reader.result))
            this.binaryFile=this.sanitizer.bypassSecurityTrustResourceUrl(String(reader.result))
          
          }
        }),(err:any)=>console.log('Error viewing the video'),
        ()=>console.info('Video Viewed successfully')
      }

    else if(splitted[0]=="audio"){
      this.isAudio=true
      var blob:any
      this.fileService.downloadFile(this.userToken.username,file.id).subscribe((res:any)=>{
        console.log(res)
        this.fileSize=res.size
        blob=new Blob([res],{type:'audio/mpeg'})
        let fileURL:any=this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob))
        this.selectedFileBLOB=this.sanitizer.bypassSecurityTrustUrl(fileURL.changingThisBreaksApplicationSecurity)
        this.file=this.selectedFileBLOB

        var reader=new FileReader()
          reader.readAsDataURL(blob)
          reader.onload=(_event)=>{
            localStorage.setItem("BinaryFile",JSON.stringify(reader.result))
            this.binaryFile=this.sanitizer.bypassSecurityTrustResourceUrl(String(reader.result))
          
          }
      }),(err:any)=>console.log('Error viewinng the audio'),
      ()=>console.info('Audio viewed successfully')
    }

    else{
      this.controllerSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.fileDetails.url);
      this.anyElseFile=true
      var blob:any
      this.fileService.downloadFile(this.userToken.username,file.id).subscribe((response: any) => { 
        console.log(response)
      this.fileSize=response.size
      blob = new Blob([response])
      let fileURL=this.sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(blob))
      this.selectedFileBLOB=fileURL
      this.file=this.selectedFileBLOB
      var reader=new FileReader()
          reader.readAsDataURL(blob)
          reader.onload=(_event)=>{
            localStorage.setItem("BinaryFile",JSON.stringify(reader.result))
            this.binaryFile=this.sanitizer.bypassSecurityTrustResourceUrl(String(reader.result))
          }
     
      }), (error: any) => console.log('Error Viewing the file'), 
            () => console.info('File Viewed successfully');
      }

      localStorage.setItem("viewFile",JSON.stringify(file))
    })

  }

  onDownload(fileId:string|null,fileName:string|null){
   
    console.log(fileId)
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    this.fileService.downloadFile(this.userToken.username,fileId!).subscribe((response: any) => { 
      console
       let blob:any = new Blob([response], { type: 'text/json; charset=utf-8' });
       const url = window.URL.createObjectURL(blob);
      // window.open(url);
       fileSaver.saveAs(blob, fileName!);
      
     }), (error: any) => console.log('Error downloading the file'), 
                 () => console.info('File downloaded successfully');
    
  }

  onDelete(fileName:string|null){

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    console.log(header)

    const url=`http://localhost:8081/api/${this.userToken.username}/delete/${fileName}`
    this.http
    .delete(url,{headers:header})
    .subscribe((response)=>{
      console.log(response)
      // window.location.reload();

    })
    
  }

  onUpdate(fileId:string|null){
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    let formData=new FormData()
    formData.set("file",this.file)
    console.log(formData.get("file"))
    const url=`http://localhost:8081/api/${this.userToken.username}/update/id/${fileId}`
    this.http
    .patch(url,formData,{headers:header})
    .subscribe((res)=>{
      console.log(res)
    })
  }

  onStar(fileName:string|null){
    this.fileService.setStar(this.userToken.username,fileName!).subscribe((response:any)=>{
      console.log(response)
    })
    window.location.reload();
  }

  openDialog() {
    this.dialog.open(ShareCompoComponent);
  }

}


