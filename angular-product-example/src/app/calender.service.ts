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

  getEventFromAPI(sort: string, order: string, page: number,search : string): Observable<any> {


    return this.http.get<any>(this.requestURL + '?SearchQuery='+ search + '&Sort=' + sort + '&Order=' + order + '&PageNumber=' + (page + 1)).pipe(

    );
  }

  deleteEvent(event: EventModel | number): Observable<EventModel> {
    const id = typeof event === 'number' ? event : event.id;
    const url = this.requestURL + '/' + id;
    return this.http.delete<EventModel>(url).pipe(
    );

  }

  //get categories by Id
  getEventById(id: number): Observable<EventModel> {
    
    return this.http.get<EventModel>(this.requestURL + '/' +id).pipe();
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  updateEvent(userUpdatedData: EventModel): Observable<EventModel> {
    debugger;
    return this.http.put<EventModel>(this.requestURL + '/' +  userUpdatedData.id,userUpdatedData).pipe(
      map(data => data));
  }

  addEvent(userUpdatedData: EventModel): Observable<EventModel> {
    debugger;
    return this.http.post<EventModel>(this.requestURL + '/' +  userUpdatedData.id,userUpdatedData,this.httpOptions).pipe();
  }

}
