import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'categoryName', 'action'];
  resultsLength = 0;
  dataCategory: CategoryModel[] = [];
  filterValue: string;
  alertMessage: string = "There Is No Data For Search Value : ";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;
  filter = new EventEmitter<void>();

  constructor(
    private categoryService : CategoryService
    ) { }

    ngAfterViewInit() {

      this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
      merge(this.sort.sortChange, this.paginator.page, this.filter)
        .pipe(
          startWith({}),
          switchMap(() => {
  
            return this.categoryService.getCategoriesFromAPI(
              this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue);
          }),
  
          map(data => {
            debugger;
            console.log(data);
            this.resultsLength = data.TotalCount;
            return data.Items;
          })
        ).subscribe(data => {
          debugger;
          this.dataCategory = data;
        });
    }


    //search filter
  searchFilter() {
    debugger;
    this.filterValue = this.searchValue.nativeElement.value;
    this.filter.emit();
    this.searchValue.nativeElement.value = "";
  }

}
