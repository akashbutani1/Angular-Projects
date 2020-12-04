import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { ProductModel } from '../ProductModel';
import { ProductService } from '../product.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) { }

  ngOnInit(): void {
    
    this.id = this.data.id;

    //getting categories data for select form field
    this.categoryService.getCategoriesFromAPI(
      '', '', 0, '')
      .pipe(first())
      .subscribe(
        data => {
          this.categoryData = data.items;
        }
      );

    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[ A-Za-z0-9_@./#&()+-]*$")]],
      productPrice: ['', [Validators.required, Validators.pattern("^[0-9.]*$")]],
      productCategory: ['', [Validators.required, Validators.minLength(3)]],

    });

    if (this.id == 0) {
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
    

    if (this.isAddMode) {
      const registerObject: ProductModel = {
        id: 0,
        productName: this.productForm.controls.productName.value,
        productPrice: parseInt(this.productForm.controls.productPrice.value),
        categoryId: parseInt(this.selectedValue)
      };
      this.productService.addProduct(registerObject).pipe(first())
      .subscribe(data => {
        if (data.id != 0) {
          this.dialogRef.close();
          this._snackbar.open('Data Added Successfully !!', 'Close', {
            duration: 4000
          });
        }
        else {
          this._snackbar.open('Duplicate Data Found !!', 'Close', {
            duration: 4000
          });
        }

      });
    }
    else {
      const registerObject: ProductModel = {
        id: this.data.id,
        productName: this.productForm.controls.productName.value,
        productPrice: parseInt(this.productForm.controls.productPrice.value),
        categoryId: parseInt(this.selectedValue)
      };
      this.productService.updateProduct(registerObject).pipe(first())
        .subscribe(response => {
          if(response != null){
            this.dialogRef.close();
            this._snackbar.open('Data Edited Successfully !!', 'Close', {
              duration: 3000
            });
          }
          else{
            this._snackbar.open('Duplicate Data Found !!', 'Close', {
              duration: 3000
            });
          }
        });
    }

  }

  changeSelect(data: any) {
    
    this.selectedValue = this.categoryData[data].categoryName;
  }

}
