import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { CalenderService } from '../calender.service';
import { CategoryService } from '../category.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {

  title: string;
  message: string;
  constructor(public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private categoryService: CategoryService,
    private calenderService : CalenderService,
    private productService : ProductService,
    private _snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    
  }

  onSubmit(){
    if (this.data.type == 'category') {
      this.categoryService.deleteCategory(this.data.DialogData)
        .pipe(first())
        .subscribe(res => {
          if (res == null) {
            this._snackbar.open('Some Error Occured !! Please Try Again', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar-style']
            });
          }
          else {
            this.dialogRef.close(1);
            this._snackbar.open('Data Deleted Successfully', 'Close', {
              duration: 3000,
              panelClass: ['snackbar-style']
            });
          }
        }
        );
    }
    else if(this.data.type == 'product'){
      this.productService.deleteProduct(this.data.DialogData)
      .pipe(first())
      .subscribe(res => {
        if (res == null) {
          this._snackbar.open('Some Error Occured !! Please Try Again', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });
        }
        else {
          this.dialogRef.close(1);
          this._snackbar.open('Data Deleted Successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-style']
          });
        }
      }
      );
    }
    else{
      this.calenderService.deleteEvent(this.data.DialogData)
      .pipe(first())
      .subscribe(res => {
        if (res == null) {
          this._snackbar.open('Some Error Occured !! Please Try Again', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });
        }
        else {
          this.dialogRef.close(1);
          this._snackbar.open('Data Deleted Successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-style']
          });
        }
      }
      );
    }
  }


}
