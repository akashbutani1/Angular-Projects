import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'api/tblProducts';

  //get products from API
  getProductsFromAPI(sort:string, order:string, page:number, firstName:string): Observable<any>{
    debugger;

    return this.http.get<any>('https://localhost:44373/api/tblProducts?SearchQuery='+firstName+'&Sort='+sort+'&Order='+order+'&PageNumber='+(page+1)).pipe(
      
    );
  }
}
