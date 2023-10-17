import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

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

  panelOpenState = false;
  userToken:any
  dp:any
  dp2:any
  name:any
  matcher = new MyErrorStateMatcher();
  file:any;

  isLinear = true;
  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  isPasswordVerified:boolean=false

  isCpasswordCorrect:boolean=false


  @Output() updateFName = new EventEmitter<string>();
  @Output() updateLName = new EventEmitter<string>();


  

  public nameChangeForm!: FormGroup 
  public userNameChangeForm!: FormGroup
  public verifyPasswordForm!:FormGroup
  public passwordChangeForm!:FormGroup
  public dpChangeForm!:FormGroup

  constructor(private formBuilder:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
      this.dp=this.userToken.dp
      this.dp2=this.dp
      this.name=this.userToken.firstname+" "+this.userToken.lastname
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

    this.http.patch<any>(`http://localhost:8081/api/${this.userToken.username}/update/name/${this.nameChangeForm.controls["firstname"].value}/${this.nameChangeForm.controls["lastname"].value}`,"",{headers:header})
      .subscribe(res=>{
        console.log(res)
      })

      this.updateFName.emit(this.nameChangeForm.controls["firstname"].value)
      this.updateLName.emit(this.nameChangeForm.controls["lastname"].value)

  }

  changeUserNameSubmit(){

    console.log(this.userNameChangeForm.value)

  }




  setDp(event:any){
    this.file=event.target.files[0]
    console.log("file",this.file)
    
    this.dp2=URL.createObjectURL(this.file)
    console.log(URL.createObjectURL(this.file))
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
      
    reader.onload = (_event) => {
      
      this.dp2 = reader.result; 
      (console.log(reader.result))
      
    }
  }

  removeDp(){
    this.dp2=''
  }

  verifyPasswordSubmit(){

    console.log(this.verifyPasswordForm.controls["cPassword"].value)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    this.http.get<any>(`http://localhost:8081/api/${this.userToken.username}/checkPassword/${this.verifyPasswordForm.controls["cPassword"].value}`,{headers:header})
    .subscribe(res=>{
      if(res){
        this.isPasswordVerified=true
      }
      
    })

  }

  changePasswordSubmit(){

    console.log(this.passwordChangeForm.controls["password"].value)
    console.log(this.passwordChangeForm.controls["confirmPassword"].value)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    this.http.patch<any>(`http://localhost:8081/api/${this.userToken.username}/updatePassword/${this.passwordChangeForm.controls["password"].value}`,"",{headers:header})
      .subscribe(res=>{
        console.log(res)
      })


  }

  changeDPSubmit(){

  }
}
