import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/file.service';

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

  constructor(private fileService:FileService) {
    
   }

  ngOnInit(): void {

   

    this.fileFromLocal=JSON.parse(localStorage.getItem("files")!)
    this.fileFromLocal.sort((a:any,b:any) => (a.lastModification.toLowerCase() > b.lastModification.toLowerCase()) ? 1 : ((b.lastModification.toLowerCase() > a.lastModification.toLowerCase()) ? -1 : 0))
    this.filesToDisplay=this.fileFromLocal.reverse().slice(0,5)
    this.filesLength=this.filesToDisplay.length
    console.log(this.filesToDisplay,this.filesLength)
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
