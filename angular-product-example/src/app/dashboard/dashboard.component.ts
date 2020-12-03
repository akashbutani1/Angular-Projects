import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @ViewChild(ProductListComponent) private productComponent: ProductListComponent;
  onTabChanged(event: MatTabChangeEvent) {
    debugger;
    if (event.index == 0) {
      this.productComponent.ngAfterViewInit();
    }
    else {
      //do nothing
    }
  }

}
