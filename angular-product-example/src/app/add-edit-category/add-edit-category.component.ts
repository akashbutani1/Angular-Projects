import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { Location } from '@angular/common'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private location: Location,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CategoryModel
  ) { }

  ngOnInit(): void {
    debugger;
    this.id = this.data.id;
    
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    });

    if (String(this.id) == "undefined") {
      this.isAddMode = true;
    }
    else {
      
      this.isAddMode = false;
      this.categoryService.getCategoriesById(this.id)
        .pipe(first())
        .subscribe(x => {
         // console.log(x);

          this.categoryForm.patchValue({
            categoryName: x.category_name
          });
        });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    debugger;

    const registerObject: CategoryModel = {
      id: this.data.id,
      category_name: this.categoryForm.controls.categoryName.value,
    };

    if (this.isAddMode) {
      this.categoryService.addCategory(registerObject).subscribe(res => {
        //console.log(res);
        //this.goBack();
      });
    }
    else {
      this.categoryService.updateCategory(registerObject)
        .subscribe(response => {
         // console.log(response);
          //this.goBack();
        });
    }

  }



}
