import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {File} from './model/files'
@Injectable({
  providedIn: 'root'
})
export class FileService {

  // SpringBackend='http://10.90.6.199:8081/api'
  NodeBackend=''
  SpringBackend='http://localhost:8081/api'


  constructor(private http:HttpClient) {  }

  userToken:any

  getFiles(userName:string){

    this.userToken=JSON.parse(localStorage.getItem("User")!)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken

    )
    

    return this.http.get<File[]>(`${this.SpringBackend}/${userName}/files`,{headers:header})

  }

  getUsers(){

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    return this.http.get<any>(`${this.SpringBackend}/Users`,{headers:header})

  }

  downloadFile(userName:string,fileId:string):any{
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    return this.http.get(`${this.SpringBackend}/${userName}/download/id/${fileId}`,{responseType:'blob',headers:header})
  }

  setStar(userName:string,fileName:string):any{

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    return this.http.patch(`${this.SpringBackend}/${userName}/markStar/${fileName}`,"",{headers:header})

  }

  setLastModification(fileName:string,newDate:string):any{

    if(localStorage.getItem("User")){
      localStorage.getItem("User")
      this.userToken=JSON.parse(localStorage.getItem("User")!)
    }

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    console.log(fileName,newDate)
    return this.http.patch(`${this.SpringBackend}/${this.userToken.username}/updateDate/fileName/${fileName}`,newDate,{headers:header})

  }

  searchFiles(fileName:string|null){
    this.userToken=JSON.parse(localStorage.getItem("User")!)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
        

    const url=`${this.SpringBackend}/${this.userToken.username}/search/${fileName}`;
    return this.http.get<File>(url,{headers:header})  
    
  }

 

}
