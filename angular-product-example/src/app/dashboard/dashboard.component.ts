import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  notifyData : string
  constructor() { }

  ngOnInit(): void {
  }

  //data from category for add / edit is done
  getData(data : string){
    this.notifyData = data;
    this.productComponent.ngOnInit();
  }

  @ViewChild(ProductListComponent) private productComponent: ProductListComponent;
  

}
