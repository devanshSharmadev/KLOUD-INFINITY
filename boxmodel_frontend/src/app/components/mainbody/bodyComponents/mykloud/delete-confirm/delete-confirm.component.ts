import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  fileName:any
   // SpringBackend='http://10.90.6.199:8081/api'
   SpringBackend='http://localhost:8081/api'
   userToken:any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private http:HttpClient,private toast: NgToastService) { 

  }

  ngOnInit(): void {
    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }
    this.fileName=this.data.fileName
  }

  onDelete(fileName:string|null){
    
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    const url=`${this.SpringBackend}/${this.userToken.username}/delete/${fileName}`

    this.http
    .delete(url,{headers:header})
    .subscribe((response)=>{
      console.log(response)
      this.toast.success({detail:"SUCCESS",summary:'File deleted',duration:5000});
      window.location.reload();
    })
    
  }
}
