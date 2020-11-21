import { Location } from '@angular/common';
import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
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
  selectedValue: number;
  alertMessage: string = "There Is No Data For Search Value : ";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;
  filter = new EventEmitter<void>();

  constructor(
    private productService: ProductService,
    private dialog: MatDialog,
    private categoryService: CategoryService,
    private router: Router
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
                this.dataCategory = data.Items;
              }
            );
          return this.productService.getProductsFromAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue,this.selectedValue);
        }),

        map(data => {
          debugger;
          // console.log(data);
          this.resultsLength = data.TotalCount;
          return data.Items;
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
        this.delete(product.Id);

        this.dataProducts = this.dataProducts.filter(h => h !== product);
        this.resultsLength = this.resultsLength - 1;
        this.router.navigate['/dashboard']; 
      }
    });

  }

  //delete Data
  delete(product: number): void {
    debugger;

    setTimeout(() => {
      this.productService.deleteProduct(product).subscribe(res => { console.log(res); });
    }, 1000);
  }

  changeSelect(data) {
    debugger;
    this.selectedValue = this.dataCategory[data].id;
    
  }

  getCategoryData(){
    this.categoryService.getCategoriesFromAPI(
      '', '', 0, '').subscribe(
        data => {
          this.dataCategory = data.Items;
        }
      );
  }



}
