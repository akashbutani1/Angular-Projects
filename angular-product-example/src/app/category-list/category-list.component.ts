import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

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
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router
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
         // console.log(data);
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


  //delete confirm dialog box 
  confirmDelete(category: CategoryModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Category : ' + category.category_name,
        message: 'Are you sure to Remove this ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(category);

        this.dataCategory = this.dataCategory.filter(h => h !== category);
        this.resultsLength = this.resultsLength - 1;
      }
    });

  }

  //delete Data
  delete(category: CategoryModel): void {

    setTimeout(() => {
      this.categoryService.deleteCategory(category).subscribe(res => { //console.log(res)
        ; });
    }, 1000);
  }

  goBack(): void {
    this.location.back();
  }

 
  
}
