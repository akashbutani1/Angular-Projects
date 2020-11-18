import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
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
    private productService : ProductService
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

}
