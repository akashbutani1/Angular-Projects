import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'https://localhost:44385/api/ScheduleAppointments';

  getEventFromAPI(sort:string, order:string, page:number): Observable<any>{
    

    return this.http.get<any>(this.requestURL + '?SearchQuery='+'&Sort='+sort+'&Order='+order+'&PageNumber='+(page+1)).pipe(
      
    );
  }
}
