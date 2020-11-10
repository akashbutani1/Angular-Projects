import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { merge, Observable, of } from 'rxjs';
import { catchError, debounceTime, filter, map, tap } from 'rxjs/operators';

import { Hero, HeroAPI, userRegister } from './hero';
import { MessageService } from './message.service';


@Injectable({ providedIn: 'root' })
export class HeroService {

  //private heroesUrl = 'api/heroes';  // URL to web api
  private url = 'https://reqres.in/api/users';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  getHeroes(sort: string, order: string, page: number): Observable<Hero[]> {
    debugger;

    return this.http.get<Hero[]>(this.url + `?page=${page + 1}`).pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );


  }

  searchHero(term: number): Observable<Hero[]> {
    debugger;

    return this.http.get<Hero[]>(this.url + `?id=${term}`)
      .pipe(
        tap(_ => this.log('fetched heroes'))
      );
  }






  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.url}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

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

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<Hero> {
    debugger;
    return this.http.put<Hero>(this.url, hero, this.httpOptions).pipe(
      map(data => data),
      tap(_ => this.log(`updated hero id = ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  addHero(body:userRegister): Observable<any> {
    console.log(body);

    return this.http.post<Hero>(this.url,body,this.httpOptions).pipe(
      tap(_ => this.log(`Hero Added Successfully : `+`${body.name}`)),
      catchError(this.handleError<any>('add Hero'))
    );
  }

  /** DELETE: delete the hero from the server */
  deleteHero(hero: Hero | number): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.url}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe();

  }

  /*SEARCH*/
  searchHeroes(term: string): Observable<Hero[]> {
    debugger;
    if (!term.trim()) {
      return of([]);
    }
    console.log(`${this.url}/?id=${parseInt(term)}`);

    return this.http.get<Hero[]>(`${this.url}/?id=${parseInt(term)}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}

