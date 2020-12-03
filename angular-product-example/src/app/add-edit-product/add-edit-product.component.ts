import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { ProductModel } from '../ProductModel';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  selectedValue: string;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) { }

  ngOnInit(): void {
    debugger;
    this.id = this.data.id;

    //getting categories data for select form field
    this.categoryService.getCategoriesFromAPI(
      '', '', 0, '').subscribe(
        data => {
          this.categoryData = data.items;
        }
      );

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[ A-Za-z0-9_@./#&()+-]*$")]],
      productPrice: ['', [Validators.required, Validators.pattern("^[0-9.]*$")]],
      productCategory: ['', [Validators.required, Validators.minLength(3)]],

    });

    if (String(this.id) == "undefined") {
      this.isAddMode = true;

    }
    else {
      this.isAddMode = false;
      this.productService.getProductById(this.id)
        .pipe(first())
        .subscribe(x => {

          this.productForm.patchValue({
            productName: x.productName,
            productPrice: x.productPrice,
            productCategory: x.categoryId
          });
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    debugger;

    if (this.isAddMode) {
      const registerObject: ProductModel = {
        id:0,
        productName: this.productForm.controls.productName.value,
        productPrice: parseInt(this.productForm.controls.productPrice.value),
        categoryId: parseInt(this.selectedValue)
      };
      this.productService.addProduct(registerObject).subscribe(data => {  
        console.log(data); 
    
      });
    }
    else {
      const registerObject: ProductModel = {
        id: this.data.id,
        productName: this.productForm.controls.productName.value,
        productPrice: parseInt(this.productForm.controls.productPrice.value),
        categoryId: parseInt(this.selectedValue)
      };
      this.productService.updateProduct(registerObject)
        .subscribe(response => {
          console.log(response);
        });
    }

  }

  changeSelect(data : any) {
    debugger;
    this.selectedValue = this.categoryData[data].categoryName;
  }

}
