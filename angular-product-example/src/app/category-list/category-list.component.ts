import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
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
          
          return this.categoryService.getCategoriesFromAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue);
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
    debugger;
    this.filterValue = this.searchValue.nativeElement.value;
    this.filter.emit();
    this.searchValue.nativeElement.value = "";
  }


  //delete confirm dialog box 
  confirmDelete(category: CategoryModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Category : ' + category.categoryName,
        message: 'Are you sure to Remove this ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(category);

        this.dataCategory = this.dataCategory.filter(h => h !== category);
        this.resultsLength = this.resultsLength - 1;
        this._snackbar.open('Data Deleted Successfully', 'Close', {
          duration: 5000
        });
      }
    });

  }

  //add data
  addNew() {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { issue: CategoryModel }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        this.refreshTable();
        this._snackbar.open('Data Added Successfully !!', 'Close', {
          duration: 5000
        });
      }
    });
  }

  //edit data
  editData(id: number, category_name: string) {
    const dialogRef = this.dialog.open(AddEditCategoryComponent, {
      data: { id: id, categoryName: category_name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        this.refreshTable();
        this._snackbar.open('Data Edited Successfully ', 'Close', {
          duration: 5000
        });
      }
    });
  }


  //refresh Table
  refreshTable() {
    debugger;
    this.categoryService.getCategoriesFromAPI(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue).subscribe(
        data => {
          this.resultsLength = data.totalCount;
          this.dataCategory = data.items;
        }
      );
  }

  //delete Data
  delete(category: CategoryModel): void {

    setTimeout(() => {
      this.categoryService.deleteCategory(category).subscribe(
        res => { 
          console.log(res);
      });
    }, 1000);
  }

  goBack(): void {
    this.location.back();
  }



}
