import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { first, map, startWith, switchMap } from 'rxjs/operators';
import { AddEditCategoryComponent } from '../add-edit-category/add-edit-category.component';
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

  @Output()
  notify: EventEmitter<string> = new EventEmitter<string>();


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;
  filter = new EventEmitter<void>();

  constructor(
    private categoryService: CategoryService,
    private dialog: MatDialog,
    private location: Location,
    private _snackbar: MatSnackBar
  ) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.filter)
      .pipe(
        startWith({}),
        switchMap(() => {
          const registerObject = {
            Sort : this.sort.active,
            Order: this.sort.direction,
            PageNumber:this.paginator.pageIndex + 1,
            SearchQuery:this.filterValue
          };
          return this.categoryService.getCategoriesFromAPI(
            registerObject);
        }),

        map(data => {
          this.resultsLength = data.totalCount;
          return data.items;
        })
      ).subscribe(data => {
        this.dataCategory = data;
      });
  }


  //search filter
  searchFilter() {

    this.filterValue = this.searchValue.nativeElement.value;
    this.filter.emit();
    this.searchValue.nativeElement.value = "";
  }


  //delete confirm dialog box 
  confirmDelete(category: CategoryModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Category : ' + category.categoryName,
        message: 'Are you sure to Remove this ?',
        DialogData : category,
        type : 'category'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.dataCategory = this.dataCategory.filter(h => h !== category);
        this.resultsLength = this.resultsLength - 1;
        
      }
    });

  }

  //add edit data
  addEditData(id: number, category_name: string) {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { id: id, categoryName: category_name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 1){
        if (id == 0) {
          this.passData('add');
        }
        else {
          this.passData('edit');
        }
      }
      
      // After dialog is closed we're doing frontend updates
      
      this.refreshTable();

    });
  }



  //refresh Table
  refreshTable() {
    const registerObject = {
      Sort : this.sort.active,
      Order: this.sort.direction,
      PageNumber:this.paginator.pageIndex + 1,
      SearchQuery:this.filterValue
    };
    this.categoryService.getCategoriesFromAPI(
      registerObject)
      .pipe()
      .subscribe(
        data => {
          this.resultsLength = data.totalCount;
          this.dataCategory = data.items;
        }
      );
  }

  

  goBack(): void {
    this.location.back();
  }

  passData(data: string) {
    this.notify.emit(data);
  }



}
