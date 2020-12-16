import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private http: HttpClient) {
    if (!!localStorage.getItem('token')) {
      const headerData = {
        username: localStorage.getItem('username'),
        image: localStorage.getItem('image')
      };
      this.user.next(headerData);
    }
  }

  redirectUrl: string;
  loginstatus: boolean;
  requestURL = 'https://localhost:44385/api/TblRegisters';
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

    localStorage.setItem('username', message.username);
    localStorage.setItem('token', message.token);
    localStorage.setItem('email', message.email);
    localStorage.setItem('id', message.id);
    localStorage.setItem('image','Resources/Images/' +  message.image);
    this.user.next(message);

  }

  updateImage(data: any): Observable<any> {
    return this.http.put(this.requestURL + '/' + localStorage.getItem('id'), data);
  }

  updateProfile(data: any): Observable<any>{
    return this.http.post(this.requestURL + '/UpdateUserData' , data);
  }

}
