import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {

  category: CategoryModel;
  id: number;
  isAddMode: boolean;
  categoryForm: FormGroup;
  success: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CategoryModel
  ) { }

  ngOnInit(): void {
    this.id = this.data.id;

    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    });

    if (this.id == 0) { 
      this.isAddMode = true;
    }
    else {
      this.isAddMode = false;
      this.categoryService.getCategoriesById(this.id)
        .pipe(first())
        .subscribe(x => {
          this.categoryForm.patchValue({
            categoryName: x.categoryName
          });
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    const registerObject: CategoryModel = {
      id: this.data.id,
      categoryName: this.categoryForm.controls.categoryName.value,
    };

    if (this.isAddMode) {
      this.categoryService.addCategory(registerObject).pipe(first()).subscribe(
        res => {
         
          if (res.id != 0) {
            this.dialogRef.close(1);
            this._snackBar.open('Data Added Successfully !!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-style']
            });
          }
          else {
            
            this._snackBar.open('Duplicate Data Found !!', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar-style']
            });
          }
        });
    }
    else {
      this.categoryService.updateCategory(registerObject).pipe(first())
        .subscribe(res => {
          if (res != null) {
            this.dialogRef.close(1);
            this._snackBar.open('Data Edited Successfully !!', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-style']
            });
          }
          else {
            
            this._snackBar.open('Duplicate Data Found !!', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar-style']
            });
          }
        });
    }

  }



}
