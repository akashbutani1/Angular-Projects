import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'api/tblCategories';

  //get products from API
  getCategoriesFromAPI(sort:string, order:string, page:number, query:string): Observable<any>{
    debugger;

    return this.http.get<any>('https://localhost:44373/api/tblCategories?SearchQuery='+query+'&Sort='+sort+'&Order='+order+'&PageNumber='+(page+1)).pipe(
      
    );
  }
}
