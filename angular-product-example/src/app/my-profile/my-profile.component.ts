import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  userName: string = localStorage.getItem('username');
  email: string = localStorage.getItem('email');
  ProfileImage = this.getImage(localStorage.getItem('image'));
  isUpdate = false;
  updateUserForm: FormGroup;
  fileName = '';
  uploadImage: any;


  constructor(
    private formbuilder: FormBuilder,
    private snackbar: MatSnackBar,
    private authService: LoginRegisterService) { }

  ngOnInit(): void {
    this.updateUserForm = this.formbuilder.group({
      Username: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
    });
  }



  onSubmit() {

    const updateProfileObject = {
      Id: +localStorage.getItem('id'),
      Username: this.updateUserForm.controls.Username.value,
      Email: this.updateUserForm.controls.Email.value
    };

    if (this.uploadImage != null) {
      const imgData = new FormData();
      imgData.append('Image', this.uploadImage, this.uploadImage.name);

      this.authService.updateImage(imgData).subscribe(
        res => {

          if (res != null) {

            localStorage.setItem('image', (res.dbPath));
            this.ProfileImage = this.getImage(res.dbPath);

            const setHeaderData = {
              username: localStorage.getItem('username'),
              image: localStorage.getItem('image')
            };
            this.authService.user.next(setHeaderData);
            this.backToProfile();
          }

          else {

            this.snackbar.open('Error Occurred !!', 'Close', {
              duration: 3000,
              panelClass: ['error-snackbar-style']
            });

          }
        });
    }

    this.authService.updateProfile(updateProfileObject).subscribe(
      result => {

        if (result != null) {

          localStorage.setItem('username', this.updateUserForm.controls.Username.value);
          localStorage.setItem('email', this.updateUserForm.controls.Email.value);

          const setHeaderData = {
            username: localStorage.getItem('username'),
            image: localStorage.getItem('image')
          };
          this.authService.user.next(setHeaderData);
          this.backToProfile();
        }
        else {

          this.snackbar.open('Error Occured !!', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });

        }
      }
    );


  }

  updateProfile() {
    this.isUpdate = true;
    this.updateUserForm.patchValue({
      Username: this.userName,
      Email: this.email
    });
  }

  backToProfile() {
    this.userName = localStorage.getItem('username');
    this.email = localStorage.getItem('email');
    this.isUpdate = false;
    this.fileName = '';
  }

  uploadFileEvent(imgFile: any) {

    if (this.ProfileImage != null) {
      this.fileName = '';
    }
    this.uploadImage = imgFile.target.files[0];
    this.fileName += imgFile.target.files[0].name; //display file name in form

  }

  getImage(path: string) {
    return 'https://localhost:44385/' + path;
  }
}

