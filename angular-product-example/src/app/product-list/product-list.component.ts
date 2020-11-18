import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
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
  filterValue: string;
  alertMessage: string = "There Is No Data For Search Value : ";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;
  filter = new EventEmitter<void>();

  constructor(
    private productService: ProductService, private dialog: MatDialog
  ) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.filter)
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.productService.getProductsFromAPI(
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
        title: 'Delete Product : ' + product.ProductName,
        message: 'Are you sure to Remove this ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        debugger;
        this.delete(product.Id);

        this.dataProducts = this.dataProducts.filter(h => h !== product);
        this.resultsLength = this.resultsLength - 1;

        // this._snackBar.open('Data Deleted Successfully!!', 'Close', {
        //   duration: 5000
        // });
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


}
