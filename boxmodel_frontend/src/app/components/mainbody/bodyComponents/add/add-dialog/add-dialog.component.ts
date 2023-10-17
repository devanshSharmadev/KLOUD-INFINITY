import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { NgToastService } from 'ng-angular-popup';


@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']

})
export class AddDialogComponent implements OnInit {

  // SpringBackend='http://10.90.6.199:8081/api'
  SpringBackend='http://localhost:8081/api'


  constructor(private http:HttpClient,private toast: NgToastService) { }

  ngOnInit(): void {
    this.localS=localStorage.getItem("files")!
    this.files2=JSON.parse(this.localS)
    this.userToken=JSON.parse(localStorage.getItem("User")!)
  }

  name:string=''
  file:any;
  imgSrc:any;
  value = 'Clear me';
  isUpload=false
  localS!:string
  userToken:any

  files:Array<any>=[]

  switchModel=false

  files2:File[]=[]
  localItem!:string;


  getName(name:string){
    this.name=name
  }

  getFile(event:any){

    this.file=event.target.files[0]
    console.log("file",this.file)
    this.name=this.file.name

    let k=this.file.type.split('/')

    if(k[1]=="javascript"){
      this.imgSrc="../../../../../../assets/js.png"
    }
    else if(k[1]=="pdf"){
      this.imgSrc="../../../../../../assets/pdf.png"
    }
    else if(k[1]=="json"){
      this.imgSrc="../../../../../../assets/json.png"
      
    }
    else if(k[1]=="xml"){
      this.imgSrc="../../../../../../assets/xml.png"
      
    }
    else if(k[1]=="zip"){
      this.imgSrc="../../../../../../assets/zip.png"
     
    }
    else if(k[0]=="audio"){
      this.imgSrc="../../../../../../assets/audio.png"
    }
    else if(k[0]=="multipart"){
       this.imgSrc="../../../../../../assets/multipart.png"
       
    }
    else if(k[1]=="css"){
      this.imgSrc="../../../../../../assets/css.png"
    }
    else if(k[1]=="csv"){
      this.imgSrc="../../../../../../assets/csv.png"
    }
    else if(k[1]=="html"){
      this.imgSrc="../../../../../../assets/html.png"
      
    }
    else if(k[1]=="plain"){
      this.imgSrc="../../../../../../assets/text.png"
     
    }
    else if(k[0]=="video"){
      this.imgSrc="../../../../../../assets/video.png"
     
    }
    else if(k[0]=="image"){
      this.imgSrc=URL.createObjectURL(this.file)
      // console.log(URL.createObjectURL(this.file))
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);

      reader.onload = (_event) => {

        this.imgSrc = reader.result; 
        // console.log(this.imgSrc)
      }
      // console.log(this.imgSrc)
    }
    else{
      this.imgSrc="../../../../../../assets/file.png"
     
    }

  }

  getFiles(event:any){
    for(let i=0;i<event.target.files.length;i++){
      this.files.push(event.target.files[i])
    }
    // console.log(this.files)

  }

  submitData(){
    let formData=new FormData()
    // formData.set("name",this.name)
    formData.set("file",this.file)
    
    this.isUpload=true
    console.log("Name: ",this.name," ","File: ",this.file)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    let params = new HttpParams().set('title', this.name);    // now it has aaa
    params = params.set('description', 'Add a description here');            

    // this.params.append('title',this.name)
    // this.params.append('description','Add a description here')

    // console.log(params,header,formData.getAll)

    this.http
    .post(`${this.SpringBackend}/${this.userToken.username}/single/upload`,formData,{headers:header,params:params})
    .subscribe((response)=>{console.log(response);

      this.files2.push(this.file)
      localStorage.setItem("files",JSON.stringify(this.files2))
      // alert("Successfully uploaded "+ response)
      this.toast.success({detail:"SUCCESS",summary:'File Uploaded',duration:5000});
      window.location.reload();
      
    })

  }

  submitData2(){


    let formData=new FormData()

    for(let i=0;i<this.files.length;i++){
      formData.append("files",this.files[i])
    }

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    let params = new HttpParams().set('title', 'Files uploaded in group');     
    params = params.set('description', 'Add a description here');
    
    this.isUpload=true
    
    this.http
    .post(`${this.SpringBackend}/${this.userToken.username}/multiple/upload`,formData,{headers:header,params:params})
    .subscribe((response)=>{
      window.location.reload();
      console.log(response)
      window.location.reload();
      
    },(err:HttpErrorResponse)=>{
      this.toast.error({detail:"ERROR",summary:"Can't upload more then 7 files",duration:3000})
    })

  }

}
