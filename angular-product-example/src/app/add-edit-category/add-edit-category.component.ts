import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { CategoryService } from '../category.service';
import { CategoryModel } from '../CategoryModel';
import { Location } from '@angular/common'

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
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    debugger;
    const id = +this.route.snapshot.paramMap.get('id');

    this.categoryForm = this.formBuilder.group({
      categoryName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    });

    if (id != 0) {
      this.isAddMode = false;
      this.categoryService.getCategoriesById(id)
        .pipe(first())
        .subscribe(x => {
          console.log(x);

          this.categoryForm.patchValue({
            categoryName: x.category_name
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

    const registerObject: CategoryModel = {
      id: +this.route.snapshot.paramMap.get('id'),
      category_name: this.categoryForm.controls.categoryName.value,
    };

    if (this.isAddMode) {
      this.categoryService.addCategory(registerObject).subscribe(res => {
        console.log(res);
        this.goBack();
      });
    }
    else {
      this.categoryService.updateCategory(registerObject)
        .subscribe(response => {
          console.log(response);
          this.goBack();
        });
    }

  }



}
