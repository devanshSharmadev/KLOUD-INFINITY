import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {EditprofileComponent} from './editprofile/editprofile.component'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  userToken:any
  name:any;
  dp:any;

  
  ngOnInit(): void {
    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
      this.name=this.userToken.firstname+" "+this.userToken.lastname
      this.dp=this.userToken.dp
      
    }
  }

  logOut(){
    localStorage.removeItem("User")
  
    window.location.reload();
  }

  openEditProfile(){
    this.dialog.open(EditprofileComponent);
  }

  setUpdatedFN(FName:any){
    this.name=FName
    console.log(FName)
  }

}
