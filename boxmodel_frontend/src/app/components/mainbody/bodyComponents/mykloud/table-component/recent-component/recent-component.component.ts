import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileService } from 'src/app/file.service';
import {File} from '../../../../../../model/files'

@Component({
  selector: 'app-recent-component',
  templateUrl: './recent-component.component.html',
  styleUrls: ['./recent-component.component.css']
})
export class RecentComponentComponent implements OnInit {

  fileFromLocal!:any

  filesToDisplay!:any

  userToken!:any

  dateToSend!:any

  filesLength!:any

  constructor(private fileService:FileService,private sanitizer: DomSanitizer) {
    
   }

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    console.log("In recent componenet")
    this.fileService.getFiles(this.userToken.username)
    .subscribe((files:File[])=>{


      files.forEach(q=>{
        let k=q.contentType.split('/')

        if(k[1]=="javascript"){
          q.thumbnail="../../../../../../../assets/js.png"
        }
        else if(k[1]=="pdf"){
          q.thumbnail="../../../../../../../assets/pdf.png"
        }
        else if(k[1]=="json"){
          q.thumbnail="../../../../../../../assets/json.png"
        }
        else if(k[1]=="xml"){
          q.thumbnail="../../../../../assets/xml.png"

        }
        else if(k[1]=="zip"){
          q.thumbnail="../../../../../../../assets/zip.png"
        }
        else if(k[0]=="audio"){
          q.thumbnail="../../../../../../../assets/audio.png"
        }
        else if(k[0]=="multipart"){
          q.thumbnail="../../../../../../../assets/multipart.png"
        }
        else if(k[1]=="css"){
          q.thumbnail="../../../../../../../assets/css.png"
        }
        else if(k[1]=="csv"){
          q.thumbnail="../../../../../../../assets/csv.png"
        }
        else if(k[1]=="html"){
          q.thumbnail="../../../../../../../assets/html.png"
        }
        else if(k[1]=="plain"){
          q.thumbnail="../../../../../../../assets/text.png"
        }
        else if(k[0]=="video"){
          q.thumbnail="../../../../../../../assets/video.png"
        }
        else if(k[0]=="image"){

          this.fileService.downloadFile(this.userToken.username,q.id).subscribe((response: any) => { 
            console.log(response)

            let blob = new Blob([response])
            q.thumbnail = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onload = (_event) =>{
              q.thumbnail=this.sanitizer.bypassSecurityTrustUrl(String(reader.result))
            }   
         
          }), (error: any) => console.log('Error Viewing the file'), 
                    () => console.info('File Viewed successfully');

          // q.thumbnail="../../../../../../../assets/image.jpeg"
        }
        else{
          q.thumbnail="../../../../../../../assets/file.png"
        }

        
        console.log(k[0])
      })
      
      this.fileFromLocal=files
      console.log(this.fileFromLocal)
      // this.fileFromLocal=JSON.parse(localStorage.getItem("files")!)
      this.fileFromLocal.sort((a:any,b:any) => (a.lastModification.toLowerCase() > b.lastModification.toLowerCase()) ? 1 : ((b.lastModification.toLowerCase() > a.lastModification.toLowerCase()) ? -1 : 0))
      this.filesToDisplay=this.fileFromLocal.reverse().slice(0,5)
      this.filesLength=this.filesToDisplay.length
      console.log(this.filesToDisplay)
      
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

}
