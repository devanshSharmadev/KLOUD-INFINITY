import { HttpClient } from '@angular/common/http';
import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {

  constructor(
    private http:HttpClient,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  // name:string=''
  // file:any;
  // imgSrc:any;

  animal!: string;
  name!: string;

  getName(name:string){
    this.name=name
  }

  // getFile(event:any){
  //   this.file=event.target.files[0]
  //   console.log("file",this.file)
  //   this.imgSrc=URL.createObjectURL(this.file)
  //   console.log(URL.createObjectURL(this.file))

  //   var reader = new FileReader();
	// 	reader.readAsDataURL(event.target.files[0]);
		
	// 	reader.onload = (_event) => {
		
	// 		this.imgSrc = reader.result; 
	// 	}

  // }

  // submitData(){
  //   let formData=new FormData()
  //   formData.set("name",this.name)
  //   formData.set("file",this.file)

  //   this.http
  //   .post('',formData)
  //   .subscribe((response)=>{})

  // }

 openDialog(){
   this.dialog.open(AddDialogComponent)
 }
  

}

