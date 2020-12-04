import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, filter, map, tap } from 'rxjs/operators';

import { HeroAPI } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  //Get Data From API Without Parameter(Dasahboard)
  getHeroesAngular(): Observable<any>{
    

    return this.http.get<any>('https://localhost:44373/api/tblHeroes?SearchQuery=&Sort=&Order=&PageNumber=1').pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<any>('getHeroes', []))
    );
  }

  //Get Data From API With Parameter(Heroes)
  getHeroesFromWebAPI(sort:string, order:string, page:number, firstName:string): Observable<any>{
    

    return this.http.get<any>('https://localhost:44373/api/tblHeroes?SearchQuery='+firstName+'&Sort='+sort+'&Order='+order+'&PageNumber='+(page+1)).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<any>('getHeroes', []))
    );
  }

  //Get Data From API With search Parameter(Dashboard)
  searchHeroesDashboard(searchValue: string): Observable<any>{
    

    return this.http.get<any>('https://localhost:44373/api/tblHeroes?SearchQuery='+searchValue+'&Sort=&Order=&PageNumber=1').pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<any>('getHeroes', []))
    );
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<HeroAPI> {
    const url = `https://localhost:44373/api/tblHeroes/${id}`;
    return this.http.get<HeroAPI>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<HeroAPI>(`getHero id=${id}`))
    );
  }

  

  /** PUT: update the hero on the server */
  updateHero(userUpdatedData: HeroAPI): Observable<HeroAPI> {
    
    return this.http.put<HeroAPI>(`https://localhost:44373/api/tblHeroes/${userUpdatedData.id}`,userUpdatedData, this.httpOptions).pipe(
      map(data => data),
      tap(_ => this.log(`updated hero id = ${userUpdatedData.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //Add hero in Heroes Component
  addHero(userData : HeroAPI): Observable<any> {
    
    return this.http.post<HeroAPI>("https://localhost:44373/api/tblHeroes",userData,this.httpOptions).pipe(
      tap(_ => this.log(`Hero Added Successfully`)),
      catchError(this.handleError<any>('Add Hero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: HeroAPI | number): Observable<HeroAPI> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = "https://localhost:44373/api/tblHeroes/"+id;
    return this.http.delete<HeroAPI>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Hero Deleted Successfully `)),
      catchError(this.handleError<any>('add Hero'))
    );

  }


  //erro Handling
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

