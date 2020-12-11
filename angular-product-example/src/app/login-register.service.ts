import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { 
    if(!!localStorage.getItem('token')){
      this.user.next(localStorage.getItem('username'));
    }
  }

  redirectUrl: string;
  loginstatus: boolean;
  requestURL: string = 'https://localhost:44385/api/TblRegisters';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  user = new BehaviorSubject<any>(null);
  

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.requestURL, userData, this.httpOptions).pipe();
  }


  checkUser(userData: any): Observable<any> {
    return this.http.post<any>(this.requestURL + '/CheckLoginData', userData, this.httpOptions);

  }

  setUserLoggedInStatus(message: any) {
    
    localStorage.setItem('username',message.username);
    localStorage.setItem('token', message.token);
    this.user.next(message);

  }


}
