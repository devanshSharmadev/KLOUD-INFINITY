import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-auth',
  templateUrl: './app-auth.component.html',
  styleUrls: ['./app-auth.component.css']
})
export class AppAuthComponent implements OnInit {

  isSignUp:boolean=false

  constructor() { }

  ngOnInit(): void {
  }

  changeToSignup(){
    this.isSignUp=true
  }

  changeToLogin(){
    this.isSignUp=false
  }
  
  


}
