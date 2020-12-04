import { AfterViewInit, Component, ElementRef, EventEmitter, Input, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { first, map, startWith, switchMap } from 'rxjs/operators';
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

  @Input()
  sendData: string;



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

  ngOnInit(): void {
    
    if (this.sendData == 'add') {
      this.getCategory();
      this.sendData = '';
    }
    else if(this.sendData == 'edit'){
      this.filter.emit();
      this.getCategory();
      this.sendData = '';
    }
    else{
      this.getCategory();
    }
  }

  ngAfterViewInit() {


    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.filter)
      .pipe(
        startWith({}),
        switchMap(() => {
          
          
          return this.productService.getProductsFromAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue, this.selectedValue);
        }),

        map(data => {

          this.resultsLength = data.totalCount;
          return data.items;
        })
      ).subscribe(data => {

        this.dataProducts = data;
      });
  }


  //search filter
  searchFilter() {

    this.filterValue = this.searchValue.nativeElement.value;
    this.filter.emit();
    this.searchValue.nativeElement.value = "";

  }



  //edit data
  addEditData(id: number, product_name: string, product_price: number, category_name: string) {
    const dialogRef = this.dialog.open(AddEditProductComponent, {
      data: { id: id, productName: product_name, productPrice: product_price, categoryName: category_name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        this.refreshTable();

      }
    });
  }

  //delete confirm dialog box 
  confirmDelete(product: ProductModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Product',
        message: 'Are you sure to Remove this ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {

        setTimeout(() => {
          this.productService.deleteProduct(product.id);
            
        }, 1000);

        this.dataProducts = this.dataProducts.filter(h => h !== product);
        this.resultsLength = this.resultsLength - 1;
        this._snackbar.open('Data Deleted Successfully : ' + product.id, 'Close', {
          duration: 5000
        });
      }
    });

  }


  changeSelect(data: any) {

    this.selectedValue = this.dataCategory[data].id;

  }

  //refresh Table
  refreshTable() {

    this.selectedValue = 0;
    this.filterValue = "";
    this.filter.emit();
  }

  //get category
  getCategory() {
    this.categoryService.getCategoriesFromAPI(
      '', '', 0, '')
      .pipe(first())
      .subscribe(
        data => {
          this.dataCategory = data.items;
        }
      );
  }


}
