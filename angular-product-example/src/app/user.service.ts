import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http : HttpClient) { }

  requestURL: string = 'https://localhost:44385/api/TblUsers';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  addUsers(userData : any): Observable<any> {
    
    return this.http.post<any>(this.requestURL ,userData,this.httpOptions).pipe();
  }

}
