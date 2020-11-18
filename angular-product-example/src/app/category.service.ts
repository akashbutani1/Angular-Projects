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

  requestURL: string = 'api/tblCategories';

  //get products from API
  getCategoriesFromAPI(sort:string, order:string, page:number, query:string): Observable<any>{
    debugger;

    return this.http.get<any>('https://localhost:44373/api/tblCategories?SearchQuery='+query+'&Sort='+sort+'&Order='+order+'&PageNumber='+(page+1)).pipe(
      
    );
  }

  //get categories by Id
  getCategoriesById(id: number): Observable<CategoryModel> {
    const url = `https://localhost:44373/api/tblCategories/${id}`;
    return this.http.get<CategoryModel>(url).pipe();
  }

   //Add Category 
   addCategory(userData : CategoryModel): Observable<any> {
    debugger;
    return this.http.post<CategoryModel>("https://localhost:44373/api/tblCategories",userData,this.httpOptions).pipe();
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** PUT: update the category on the server */
  updateCategory(userUpdatedData: CategoryModel): Observable<CategoryModel> {
    debugger;
    return this.http.put<CategoryModel>(`https://localhost:44373/api/tblCategories/${userUpdatedData.id}`,userUpdatedData, this.httpOptions).pipe(
      map(data => data));
  }

  //delete category
  
  deleteCategory(category: CategoryModel | number): Observable<CategoryModel> {
    const id = typeof category === 'number' ? category : category.id;
    const url = "https://localhost:44373/api/tblCategories/"+id;
    return this.http.delete<CategoryModel>(url, this.httpOptions).pipe(
    );

  }


}
