import { Component, OnInit } from '@angular/core';
import {File} from '../../../../model/files'
import {FileService} from '../../../../file.service'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as fileSaver from 'file-saver';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageThumbnail } from 'src/app/model/imageThumbnail';

@Component({
  selector: 'app-mykloud',
  templateUrl: './mykloud.component.html',
  styleUrls: ['./mykloud.component.css']
})
export class MykloudComponent implements OnInit {

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

  timeLeft: number = 3;
  interval:any;

    // SpringBackend='http://10.90.6.199:8081/api'

    SpringBackend='http://localhost:8081/api'


  constructor(private fileService:FileService,private http:HttpClient,private sanitizer: DomSanitizer) { }


  ngOnInit(): void {

  
    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }
    
    this.fileService.getFiles(this.userToken.username)
    .subscribe((files:File[])=>{

      files.forEach(q=>{
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
      
      localStorage.setItem("files",JSON.stringify(files))
      this.localItem=localStorage.getItem("files")!
      this.files=JSON.parse(this.localItem) 
      console.log(files)
      this.isSearch=false
      
    })

    

    this.startTimer()
    
   
  }

  onSearch(searchItem:string|null){
    this.fileService.searchFiles(searchItem)
    .subscribe((file:File)=>{
      this.file=file
      console.log(file)
      this.isSearch=true
    })
  }
  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        console.log(this.timeLeft)
      } 
    },1000)
  }


  onHome(){
    this.isSearch=false
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

  onView(fileId:string|null){

    var blob:any

    this.fileService.downloadFile(this.userToken.username,fileId!).subscribe((response: any) => { 
      blob = new Blob([response])
      this.base64IMGG = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
      var reader = new FileReader();
      reader.readAsDataURL(blob); 
      reader.onload = (_event) =>{
        this.base64IMGG=this.sanitizer.bypassSecurityTrustUrl(String(reader.result))
      }   
      
          
     
    }), (error: any) => console.log('Error Viewing the file'), 
                () => console.info('File Viewed successfully');

  }

  onUpdate(fileId:string|null,file:File){

    console.log(fileId,file)

    this.UFile=file
    let formData=new FormData()
    formData.set("file",this.UFile)

    const url=`http://localhost:8080/update/id/${fileId}`
    this.http
    .patch(url,formData)
    .subscribe((response)=>{
      console.log(response)
    })
  
  }

  nameDisplay(name:string): string {

    console.log(name)
    return "name"
  }

   onDelete(fileName:string|null){

    // console.log(fileId, typeof(fileId))
    // JSON.stringify(fileId)
    // console.log(fileId,typeof(fileId))

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    const url=`${this.SpringBackend}/api/${this.userToken.username}/delete/${fileName}`

    

    this.http
    .delete(url,{headers:header})
    .subscribe((response)=>{
      console.log(response)
      window.location.reload();

    })
    
  }
  

}
