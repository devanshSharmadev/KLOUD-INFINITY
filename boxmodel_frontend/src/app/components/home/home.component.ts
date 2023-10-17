import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isUser:boolean=false
  

  constructor(private router:Router,private jwtHelper: JwtHelperService) {



   }

  ngOnInit(): void {

    if(localStorage.getItem("User")){

      console.log(JSON.parse(localStorage.getItem("User")!).accessToken)

      if (this.tokenExpired(JSON.parse(localStorage.getItem("User")!).accessToken)) {
        this.isUser=false
      } else {
        this.isUser=true
      }

      
    }

  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

}


