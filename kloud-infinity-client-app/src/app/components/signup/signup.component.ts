import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent!.dirty);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty);

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup 
  imgSrc:any=''
  file:any;
  base64Output !: string;
  imageUrl?:string;
  matcher = new MyErrorStateMatcher();
  msg=''


  constructor(private formBuilder:FormBuilder,private http:HttpClient,private router:Router,private sant:DomSanitizer) { }

  ngOnInit(): void {

    this.signupForm=this.formBuilder.group({
      firstname:['',{
        validators:[
          Validators.required,
          Validators.pattern('^[A-Z]+[a-zA-Z]*$')
        ]
      }],
      lastname:['',{
        validators:[
          Validators.required,
          Validators.pattern('^[A-Z]+[a-zA-Z]*$')
        ]
      }],
      username:['',{
        validators:[
          Validators.required,
          Validators.pattern('^[a-z0-9_]*$')
        ]
      }],
      email:['',{
        validators:[
          Validators.required,
          Validators.email
        ]
      }],
      password:['',{
        validators:[
          Validators.required,
          Validators.minLength(6)
        ]
      }],
      confirmPassword:['']
    },{validator: this.checkPasswords })

    console.log(this.imgSrc)

  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.controls['password'].value;
    let confirmPass = group.controls['confirmPassword'].value;

    return pass === confirmPass ? null : { notSame: true }
  }



  signUp(){
    this.signupForm=this.formBuilder.group({
      ...this.signupForm.controls,
      dp:[this.imgSrc]
    })

    // this.signupForm=this.formBuilder.group({
    //   ...this.signupForm.controls,
    //   roles:["user","mod"]
    // })
    console.log(this.signupForm.value)

    this.http.post<any>("http://localhost:8081/api/auth/signup",this.signupForm.value)
    .subscribe(res=>{
      this.signupForm.reset()
      window.location.reload();
    },err=>{
      if(err.error.message){
        this.msg=err.error.message
      }
      else{
        this.msg="Something went wrong"
      }

    })

  }

  getFile(event:any){
    this.file=event.target.files[0]
    console.log("file",this.file)
    
    this.imgSrc=URL.createObjectURL(this.file)
    console.log(URL.createObjectURL(this.file))
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
      
    reader.onload = (_event) => {
      
      this.imgSrc = reader.result; 
      (console.log(reader.result))
      
    }
  }

}
