import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryModel } from './CategoryModel';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  requestURL: string = 'https://localhost:44385/api/TblCategories';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  //get products from API
  getCategoriesFromAPI(sort:string, order:string, page:number, query:string): Observable<any>{
    
    return this.http.get<any>(this.requestURL + '?SearchQuery='+query+'&Sort='+sort+'&Order='+order+'&PageNumber='+(page+1)).pipe();
  }

  //get categories by Id
  getCategoriesById(id: number): Observable<CategoryModel> {
    const url = this.requestURL + `/${id}`;
    return this.http.get<CategoryModel>(url).pipe();
  }

   //Add Category 
   addCategory(userData : CategoryModel): Observable<any> {
    debugger;
    return this.http.post<CategoryModel>(this.requestURL ,userData,this.httpOptions).pipe();
  }

  

  /** PUT: update the category on the server */
  updateCategory(userUpdatedData: CategoryModel): Observable<CategoryModel> {
    debugger;
    return this.http.put<CategoryModel>(this.requestURL + `/${userUpdatedData.id}`,userUpdatedData, this.httpOptions).pipe(
      map(data => data));
  }

  //delete category
  
  deleteCategory(category: CategoryModel | number): Observable<CategoryModel> {
    const id = typeof category === 'number' ? category : category.id;
    const url = this.requestURL +id;
    return this.http.delete<CategoryModel>(url, this.httpOptions).pipe(
    );

  }


}
