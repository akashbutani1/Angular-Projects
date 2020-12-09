import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  redirectUrl : string;
  loginstatus : boolean;
  requestURL: string = 'https://localhost:44385/api/TblRegisters';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  @Output() loggedInUser: EventEmitter<any> = new EventEmitter<any>();

  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.requestURL, userData, this.httpOptions).pipe();
  }


  checkUser(userData: any): Observable<any> {
    return this.http.post<any>(this.requestURL + '/CheckLoginData' , userData , this.httpOptions);
    
  }


  //get user data
  getLoggedInUserDetails(): Observable<any> {

    return this.loggedInUser.asObservable();
  }

  //set user login status
  setUserLoggedInStatus(message: any) {

    this.loggedInUser.emit(message);

  }

  
}
