import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { FileService } from 'src/app/file.service';

@Component({
  selector: 'app-share-compo',
  templateUrl: './share-compo.component.html',
  styleUrls: ['./share-compo.component.css']
})
export class ShareCompoComponent implements OnInit {

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

  // - * -

  public shareForm!: FormGroup 

  shareTo!:any

  fileInfo!:any

  users:Array<any>=[]
  constructor(private fileService:FileService,private formBuilder:FormBuilder,private http:HttpClient) { }

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

    console.log(this.shareForm.value)
    console.log(this.fileWriteAccess)
    this.http.post<any>("http://localhost:3000/",this.shareForm.value)
    .subscribe(res=>{
      this.shareForm.reset()
      this.fileSharedMsg=`File Shared successfuly to ${this.toUser}`
    },err=>{
      console.log(err)
      this.fileSharedMsg=`File sharing unsuccessful`
    })

    
  }

  parseHomeTeam(op:any){
    this.shareTo=op
  }

  doIfChecked(checkStatus:any){
    this.fileWriteAccess=checkStatus.checked
  }

}
