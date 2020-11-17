import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService : ProductService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      data => {
        console.log(data);
        
      }
    );
  }

}
