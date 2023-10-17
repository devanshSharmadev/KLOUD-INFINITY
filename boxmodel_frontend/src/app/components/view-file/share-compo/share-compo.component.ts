import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FileService } from 'src/app/file.service';
import { NgToastService } from 'ng-angular-popup';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-share-compo',
  templateUrl: './share-compo.component.html',
  styleUrls: ['./share-compo.component.css']
})
export class ShareCompoComponent implements OnInit {

  // NodeBackend='http://10.90.6.199:3000'
  NodeBackend='http://localhost:3000'

  toShareEmail!:string
  myControl = new FormControl('');
  options: string[] = [];
  filteredOptions!: Observable<string[]>;
  userToken:any

  // DATA TO BE SHARED

  fromUser:any
  toUser:any
  fileB:any
  fileName:any
  filePath:any
  fileContentType:any
  fileIsStarred:any
  fileUserName:any
  fileSharingDate:any
  fileWriteAccess:boolean=false
  fileSharedMsg:string=''

  userAvailable:boolean=false

  // - * -

  public shareForm!: FormGroup 

  shareTo!:any

  fileInfo!:any

  users:Array<any>=[]

  isUserSelected:boolean=false

  constructor(private fileService:FileService,private formBuilder:FormBuilder,private http:HttpClient,private toast: NgToastService,public dialog: MatDialog,private dialogRef: MatDialogRef<ShareCompoComponent>) { }

  ngOnInit(): void {

    localStorage.getItem("viewFile")
    this.fileInfo=JSON.parse(localStorage.getItem("viewFile")!)
    console.log(this.fileInfo)

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }


    this.fileService.getUsers()
    .subscribe((Users)=>
    {
      console.log(Users)
      Users.forEach((q:any)=>{
        this.options.push(q.username)
        console.log(q.username)
      })
      this.userAvailable=true
    }
    
    )

    console.log(this.users)

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );


  }

  onChangeEvent(event: any){

    console.log(event.target.value);
    this.toShareEmail=event.target.value
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onChange(deviceValue:any) {
    console.log(deviceValue);
  }

  share(){

    this.fromUser=this.userToken.username
    this.toUser=this.shareTo
    this.fileB=JSON.parse(localStorage.getItem("BinaryFile")!)
    this.fileName=JSON.parse(localStorage.getItem("viewFile")!).fileName
    this.filePath=JSON.parse(localStorage.getItem("viewFile")!).filePath
    this.fileContentType=JSON.parse(localStorage.getItem("viewFile")!).contentType
    this.fileIsStarred=JSON.parse(localStorage.getItem("viewFile")!).starred
    this.fileUserName=JSON.parse(localStorage.getItem("viewFile")!).username
    
    var today = new Date();
    this.fileSharingDate=today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear()+" "+today.getHours()+":"+today.getMinutes()+":"+today.getSeconds()
    
    this.shareForm=this.formBuilder.group({
      fromUser:[this.fromUser],
      toUser:[this.toUser],
      fileName:[this.fileName],
      filePath:[this.filePath],
      fileContentType:[this.fileContentType],
      fileisStarred:[this.fileIsStarred],
      fileUserName:[this.fileUserName],
      fileSharingDate:[this.fileSharingDate],
      binaryFile:[this.fileB],
      writeAccess:[this.fileWriteAccess]
    })

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    console.log(this.shareForm.value)
    console.log(this.fileWriteAccess)
    this.http.post<any>(`${this.NodeBackend}/`,this.shareForm.value)
    .subscribe(res=>{
      this.shareForm.reset()
      this.fileSharedMsg=`File Shared successfuly to ${this.toUser}`
      this.toast.success({detail:"SUCCESS",summary:`File Shared successfuly to ${this.toUser}`,duration:5000});
    },err=>{
      console.log(err)
      this.fileSharedMsg=`File sharing unsuccessful`
      this.toast.error({detail:"Error",summary:'something went wrong',duration:5000})
    })

    this.fileWriteAccess=false
    this.shareTo=''
    this.dialogRef.close()
    

    
  }

  parseHomeTeam(op:any){
    this.shareTo=op

    if(this.shareTo!=''){
      this.isUserSelected=true
    }
    else{
      this.isUserSelected=false
    }
  }

  doIfChecked(checkStatus:any){
    this.fileWriteAccess=checkStatus.checked
  }

}
