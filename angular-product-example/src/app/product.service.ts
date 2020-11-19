import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
  
  deleteProduct(product:  number): Observable<ProductModel> {
    debugger;
    
    const url = "https://localhost:44373/api/tblProducts/"+product;
    return this.http.delete<ProductModel>(url, this.httpOptions).pipe(
    );

  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  

  //get products by id
  getProductById(id: number) : Observable<ProductModel>{
    debugger;
    const url = 'https://localhost:44373/api/tblProducts/'+id;
    return this.http.get<ProductModel>(url).pipe();
  }

  //add product
  addProduct(userData: ProductModel): Observable<any>{
    debugger;
    return this.http.post<any>("https://localhost:44373/api/tblProducts",userData,this.httpOptions).pipe();
  }

  //update product
  updateProduct(userUpdatedData : ProductModel) : Observable<ProductModel>{
    debugger;
    return this.http.put<ProductModel>(`https://localhost:44373/api/tblProducts/${userUpdatedData.Id}`,userUpdatedData, this.httpOptions).pipe(
      map(data => data));
  }
}
