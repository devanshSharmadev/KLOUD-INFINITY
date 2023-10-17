import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {MatDialog,MatDialogClose} from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // SpringBackend='http://10.90.6.199:8081/api'
  NodeBackend=''
  SpringBackend='http://localhost:8081/api'

  public loginForm!:FormGroup
  user2:any
  myHead:any=new Headers()
  userToken:any

  msg=''

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,public dialog: MatDialog,private toast: NgToastService) { }

  ngOnInit(): void {
    this.loginForm=this.formBuilder.group({
      username:[''],
      password:['']
    })
  }

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }

  

  login(){



    this.http.post<any>(`${this.SpringBackend}/auth/signin`,this.loginForm.value)
    .subscribe(res=>{
      console.log("user ", res);
      localStorage.setItem("User",JSON.stringify(res))
      this.loginForm.reset()
      window.location.reload();
      this.toast.success({detail:"SUCCESS",summary:'Login Successful',duration:5000});
    },err=>{
    
      console.log(err.status)
      if(err.status==401){
        this.dialog.open(DialogElementsExampleDialog);

      }
      else if(this.loginForm.value['username']=='' || this.loginForm.value['password']=='' ){
        this.msg='Please Enter all credentials'
      }
      else{
        this.msg='something went wrong'
        this.toast.error({detail:"ERROR",summary:"Something went wrong",duration:5000})
      }
    })


   
  }



}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'error-dialog.html',
})
export class DialogElementsExampleDialog {}