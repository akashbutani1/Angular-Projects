import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { ProductModel } from '../ProductModel';
import { Location } from '@angular/common';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  product: ProductModel;
  id: number;
  isAddMode: boolean;
  productForm: FormGroup;
  categoryData: CategoryModel[] = [];
  selectedValue : string;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    debugger;
    const id = +this.route.snapshot.paramMap.get('id');

    //getting categories data for select form field
    this.categoryService.getCategoriesFromAPI(
      '', '', 0, '').subscribe(
        data => {
          console.log(data.Items);
          this.categoryData = data.Items;
        }
      );

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[ A-Za-z0-9_@./#&()+-]*$")]],
      productPrice: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      productCategory: ['', [Validators.required, Validators.minLength(3)]],
      
    });

    if (id != 0) {
      this.isAddMode = false;
      this.productService.getProductById(id)
        .pipe(first())
        .subscribe(x => {
          console.log(x);

          this.productForm.patchValue({
            productName: x.product_name,
            productPrice: x.product_price,
            productCategory: x.category_id
          });
        });
    }
    else {
      this.isAddMode = true;
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    debugger;

    const registerObject: ProductModel = {
      Id: +this.route.snapshot.paramMap.get('id'),
      product_name: this.productForm.controls.productName.value,
      product_price: this.productForm.controls.productPrice.value,
      category_id: this.selectedValue
    };

    if (this.isAddMode) {
      this.productService.addProduct(registerObject).subscribe(res => {
        console.log(res);
        this.goBack();
      });
    }
    else {
      this.productService.updateProduct(registerObject)
        .subscribe(response => {
          console.log(response);
          this.goBack();
        });
    }

  }

  changeSelect(data){
    debugger;
    this.selectedValue = this.categoryData[data].category_name;
    
  }

}
