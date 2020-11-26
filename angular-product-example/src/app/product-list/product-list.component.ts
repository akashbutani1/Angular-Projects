import { AfterViewInit, Component, ElementRef, EventEmitter,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { AddEditProductComponent } from '../add-edit-product/add-edit-product.component';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { ProductService } from '../product.service';
import { ProductModel } from '../ProductModel';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'productName', 'productPrice', 'productCategory', 'action'];
  resultsLength = 0;
  dataProducts: ProductModel[] = [];
  dataCategory: CategoryModel[] = [];
  filterValue: string;
  selectedValue: number = 0;
  alertMessage: string = "There Is No Data For Search Value : ";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;
  filter = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private _snackbar: MatSnackBar
  ) { }


  ngAfterViewInit() {

    debugger;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.filter)
      .pipe(
        startWith({}),
        switchMap(() => {
          //getting categories data for select form field
          this.categoryService.getCategoriesFromAPI(
            '', '', 0, '').subscribe(
              data => {
                this.dataCategory = data.items;
              }
            );
          return this.productService.getProductsFromAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue,this.selectedValue);
        }),

        map(data => {
          debugger;
          console.log(data);
          this.resultsLength = data.totalCount;
          return data.items;
        })
      ).subscribe(data => {
        debugger;
        this.dataProducts = data;
      });
  }


  //search filter
  searchFilter() {
    debugger;
    this.filterValue = this.searchValue.nativeElement.value;    
    this.filter.emit();
    this.searchValue.nativeElement.value = "";
    
  }

  //add data
  addNew() {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      data: { issue: ProductModel }
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
  editData(id: number, product_name:string,product_price:number,category_name:string) {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      data: { id: id, productName: product_name,productPrice: product_price,categoryName: category_name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        this.refreshTable();
        this._snackbar.open('Data Edited Successfully : '+id, 'Close', {
          duration: 5000
        });
      }
    });
  }

  //delete confirm dialog box 
  confirmDelete(product: ProductModel) {
    debugger;
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product',
        message: 'Are you sure to Remove this ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        debugger;
        setTimeout(() => {
          this.productService.deleteProduct(product.id).subscribe(res => { console.log(res); });
        }, 1000);

        this.dataProducts = this.dataProducts.filter(h => h !== product);
        this.resultsLength = this.resultsLength - 1; 
        this._snackbar.open('Data Deleted Successfully : '+product.id, 'Close', {
          duration: 5000
        });
      }
    });

  }


  changeSelect(data : any) {
    debugger;
    this.selectedValue = this.dataCategory[data].id;
    
  }

  //refresh Table
  refreshTable() {
    debugger;
    this.selectedValue = 0;
    this.filterValue = "";
    this.filter.emit();
  }


}
