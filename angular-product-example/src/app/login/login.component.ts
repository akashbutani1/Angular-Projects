import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(private formbuilder: FormBuilder,
    private authService: LoginRegisterService,
    private route: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    const registerObject = {
      Email: this.loginForm.controls.Email.value,
      Password: this.loginForm.controls.Password.value
    }
    this.authService.checkUser(registerObject).pipe(first()).subscribe(
      result => {
        if (result != null) {

          this.authService.setUserLoggedInStatus(result);

            this.route.navigate([this.authService.redirectUrl]);
          
          
          this.authService.redirectUrl = null;
          this.snackbar.open('Login successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-style']
          });


        }
        else {
          this.snackbar.open('Login Failed !! Try Again', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });
        }
      }
    );
  }

}
