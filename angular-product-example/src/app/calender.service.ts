import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventModel } from './EventModel';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'https://localhost:44385/api/ScheduleAppointments';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getEventFromAPI(data : any): Observable<any> {

    return this.http.get<any>(this.requestURL + '?SearchQuery='+data.SearchQuery+'&Sort='+data.Sort+'&Order='+data.Order+'&PageNumber='+data.PageNumber).pipe();
  
  }

  deleteEvent(event: EventModel): Observable<EventModel> {

    //const id = typeof event === 'number' ? event : event.id;
    const url = this.requestURL + '/' + event.id;
    return this.http.delete<EventModel>(url).pipe(
    );

  }

  //get categories by Id
  getEventById(id: number): Observable<EventModel> {
    
    return this.http.get<EventModel>(this.requestURL + '/' +id).pipe();

  }

  updateEvent(userUpdatedData: EventModel): Observable<EventModel> {

    return this.http.put<EventModel>(this.requestURL + '/' +  userUpdatedData.id,userUpdatedData).pipe(
      map(data => data));

  }

  addEvent(userUpdatedData: EventModel): Observable<EventModel> {

    return this.http.post<EventModel>(this.requestURL + '/' +  userUpdatedData.id,userUpdatedData,this.httpOptions).pipe();
  
  }

}
