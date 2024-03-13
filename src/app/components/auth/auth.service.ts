import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
  })
  export class AuthService {
    //api
    url = "http://localhost:3000/"  
    httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    
    constructor(private http: HttpClient) { }
    //sign-in
 //login-super_admin
 superadminLogin(data:any):Observable<any>{
   return this.http.post(this.url+"api/super_admin/login",data,{
     headers:this.httpHeaders
   });
 }
 
 public isAuthenticated(): boolean {
   return this.getToken() !== null;
 }
 
 
 getToken() {
   let accessToken = localStorage.getItem('accessToken');
   if (accessToken != null) {
     return accessToken;
   }
   return null;
 } 
    }