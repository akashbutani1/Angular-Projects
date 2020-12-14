import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userName : string = localStorage.getItem('username');
  email : string = localStorage.getItem('email');
  ProfileImage  = ('../assets/' + localStorage.getItem('image'));
  isUpdate : boolean = false;
  updateUserForm : FormGroup;
  fileAttr = localStorage.getItem('image');
  

  constructor(
    private formbuilder : FormBuilder,
    private snackbar : MatSnackBar,
    private authService : LoginRegisterService) { }

  ngOnInit(): void {
    this.updateUserForm = this.formbuilder.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
    });
  }

  onSubmit(){
    const updateProfileObject = {
      Email : this.updateUserForm.controls.Email.value,
      Username : this.updateUserForm.controls.Username.value,
      Image : this.fileAttr
    }

    this.authService.updateMyProfileData(updateProfileObject).subscribe(
      res => {
        if(res != null){
          localStorage.setItem('username',this.updateUserForm.controls.Username.value);
          localStorage.setItem('email',this.updateUserForm.controls.Email.value);
          localStorage.setItem('image',this.fileAttr);

          const setHeaderData = {
            username : localStorage.getItem('username'),
            image : localStorage.getItem('image')
          }
          this.authService.user.next(setHeaderData);

          this.backToProfile();

          this.snackbar.open('Data Updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-style']
          });

        }
        else{
          this.snackbar.open('Erro Occurred', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });
        }
      }
    )
    
  }

  updateProfile(){
    this.isUpdate = true;
  }

  backToProfile(){
    this.userName = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.ProfileImage = ('../assets/' + localStorage.getItem('image'));
    this.isUpdate = false;
  }

  uploadFileEvent(imgFile: any) {
    if(this.fileAttr != null){
      this.fileAttr = '';
    }
    this.fileAttr += imgFile.target.files[0].name;
    
  }

}
