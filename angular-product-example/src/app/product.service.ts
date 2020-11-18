import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './ProductModel';

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

  //delete product
  
  deleteProduct(product: ProductModel | number): Observable<ProductModel> {
    const id = typeof product === 'number' ? product : product.id;
    const url = "https://localhost:44373/api/tblProducts/"+id;
    return this.http.delete<ProductModel>(url, this.httpOptions).pipe(
    );

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
}
