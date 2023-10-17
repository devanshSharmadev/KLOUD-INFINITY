import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import {File} from './model/files'
@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) {  }

  userToken:any

  getFiles(userName:string){

    this.userToken=JSON.parse(localStorage.getItem("User")!)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken

    )
    

    return this.http.get<File[]>(`http://localhost:8081/api/${userName}/files`,{headers:header})

  }

  getUsers(){

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    return this.http.get<any>(`http://localhost:8081/api/Users`,{headers:header})

  }

  downloadFile(userName:string,fileId:string):any{
    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    return this.http.get(`http://localhost:8081/api/${userName}/download/id/${fileId}`,{responseType:'blob',headers:header})
  }

  setStar(userName:string,fileName:string):any{

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )

    return this.http.patch(`http://localhost:8081/api/${userName}/markStar/${fileName}`,"",{headers:header})

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
    return this.http.patch(`http://localhost:8081/api/${this.userToken.username}/updateDate/fileName/${fileName}`,newDate,{headers:header})

  }

  searchFiles(fileName:string|null){
    this.userToken=JSON.parse(localStorage.getItem("User")!)

    let header=new HttpHeaders().set(
      "Authorization",
      this.userToken.tokenType+" "+this.userToken.accessToken
    )
        

    const url=`http://localhost:8081/api/${this.userToken.username}/search/${fileName}`;
    return this.http.get<File>(url,{headers:header})  
    
  }

 

}
