import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgToastService } from 'ng-angular-popup';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {

  // SpringBackend='http://10.90.6.199:8081/api'
  SpringBackend='http://localhost:8081/api'

  panelOpenState = false;
  userToken:any
  name:any
  matcher = new MyErrorStateMatcher();
  file:any;

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isPasswordVerified:boolean=false

  isCpasswordCorrect:boolean=false
  dp:any
  dp2:any


  @Output() updateFName = new EventEmitter<string>();
  @Output() updateLName = new EventEmitter<string>();


  

  public nameChangeForm!: FormGroup 
  public userNameChangeForm!: FormGroup
  public verifyPasswordForm!:FormGroup
  public passwordChangeForm!:FormGroup
  public dpChangeForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient,private toast: NgToastService,private sanitizer: DomSanitizer) { }

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
      this.name=this.userToken.firstname+" "+this.userToken.lastname
      this.dp=this.userToken.dp
      this.dp2=this.userToken.dp
    }

    this.nameChangeForm=this.formBuilder.group({
      firstname:[this.userToken.firstname,{
        validators:[
          Validators.required,
          Validators.pattern('^[A-Z]+[a-zA-Z]*$')
        ]
      }],
      lastname:[this.userToken.lastname,{
        validators:[
          Validators.required,
          Validators.pattern('^[A-Z]+[a-zA-Z]*$')
        ]
      }]
    })

    this.userNameChangeForm=this.formBuilder.group({
      username:[this.userToken.username,{
        validators:[
          Validators.required,
          Validators.pattern('^[a-z0-9_]*$')
        ]
      }]
    })

    this.verifyPasswordForm=this.formBuilder.group({
      cPassword:['',{
        Validators:[
          Validators.required
        ]
      }]
    })

    this.passwordChangeForm=this.formBuilder.group({

      password:['',{
        validators:[
          Validators.required,
          Validators.minLength(6)
        ]
      }],
      confirmPassword:['']
    }  ,{validator: this.checkPasswords })

   

    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required],
    });

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;
    return pass === confirmPass ? null : { notSame: true }
  }


  changeNameSubmit(){

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    this.http.patch<any>(`${this.SpringBackend}/${this.userToken.username}/update/name/${this.nameChangeForm.controls["firstname"].value}/${this.nameChangeForm.controls["lastname"].value}`,"",{headers:header})
      .subscribe(res=>{
        console.log(res)
        this.toast.success({detail:"Name Changed",summary:`You will see the changes next time you login`,duration:3000});
      })

      this.updateFName.emit(this.nameChangeForm.controls["firstname"].value)
      this.updateLName.emit(this.nameChangeForm.controls["lastname"].value)
  }

  changeDPSubmit(){

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    var reader = new FileReader();
    reader.readAsDataURL(this.file);
    reader.onload = (_event) => {
      
      this.dp2 = reader.result; 
      (console.log(reader.result))


      this.http.patch<any>(`${this.SpringBackend}/${this.userToken.username}/updateProfileDp`,{updatedDP:reader.result},{headers:header})
        .subscribe( res=>{
          console.log(res)
          this.toast.success({detail:"DP Changed",summary:`You will see the changes next time you login`,duration:3000});

        }

        )
      
    }

  }

  changeUserNameSubmit(){

   
  }




  



  verifyPasswordSubmit(){

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    this.http.get<any>(`${this.SpringBackend}/${this.userToken.username}/checkPassword/${this.verifyPasswordForm.controls["cPassword"].value}`,{headers:header})
    .subscribe(res=>{
      if(res){
        console.log(res)
        this.isPasswordVerified=true
        this.toast.success({detail:"Password Verified",summary:`Click on next to set new Password`,duration:3000});
      }
      
    })

  }

  changePasswordSubmit(){
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    this.http.patch<any>(`${this.SpringBackend}/${this.userToken.username}/updatePassword/${this.passwordChangeForm.controls["password"].value}`,"",{headers:header})
      .subscribe(res=>{
        console.log(res)
        this.toast.success({detail:"Success",summary:`Password changed successfuly`,duration:3000});
      })


  }

  removeDP(){
    this.dp2=''
  }

  setDp(event:any){
    this.file=event.target.files[0]
    console.log("file",this.file)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
    
    this.dp2=URL.createObjectURL(this.file)
    console.log(URL.createObjectURL(this.file))
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
      
    reader.onload = (_event) => {
      
      this.dp2 = reader.result; 
      (console.log(reader.result))
      
    }

    console.log(this.dp2)

    
  }

  
  
}
