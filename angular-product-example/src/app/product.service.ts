import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from './ProductModel';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'https://localhost:44385/api/TblProducts';

  //get products from API
  getProductsFromAPI(sort: string, order: string, page: number, firstName: string, category: number): Observable<any> {
    debugger;

    return this.http.get<any>(this.requestURL+'?SearchQuery=' + firstName + '&Sort=' + sort + '&Order=' + order + '&PageNumber=' + (page + 1) + '&SearchCatgory=' + category).pipe(

    );
  }

  //delete product

  deleteProduct(product: number): Observable<ProductModel> {
    debugger;

    const url = this.requestURL + '/' + product;
    return this.http.delete<ProductModel>(url, this.httpOptions).pipe(
    );

  }

  //get products by id
  getProductById(id: number): Observable<ProductModel> {
    debugger;
    const url = this.requestURL + '/' + id;
    return this.http.get<ProductModel>(url).pipe();
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  //add product
  addProduct(userData: ProductModel): Observable<ProductModel> {
    debugger;
    
    return this.http.post<ProductModel>(this.requestURL, userData).pipe();
  }

  //update product
  updateProduct(userUpdatedData: ProductModel): Observable<ProductModel> {
    debugger;
    return this.http.put<ProductModel>(this.requestURL + '/' + userUpdatedData.id, userUpdatedData, this.httpOptions).pipe(
    );
  }
}
