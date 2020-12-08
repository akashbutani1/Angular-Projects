import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'https://localhost:44385/api/TblRegisters';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUser(userData : any) : Observable<any>{
    return this.http.post<any>(this.requestURL,userData,this.httpOptions).pipe();
  }


  checkUser(userData : any) : Observable<any>{
    return this.http.get<any>(this.requestURL + '?email=' + userData.Email + '&password=' + userData.Password).pipe();
  }
}
