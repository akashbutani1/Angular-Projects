import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AppComponent } from '../app.component';
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
    private loginService: LoginRegisterService,
    private route: Router,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      Email: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[ A-Za-z0-9_]*$")]],
    });
  }

  onSubmit() {
    const registerObject = {
      Email: this.loginForm.controls.Email.value,
      Password: this.loginForm.controls.Password.value
    }
    debugger;
    this.loginService.checkUser(registerObject).pipe(first()).subscribe(
      result => {
        if (result != null) {

          this.loginService.setUserLoggedInStatus(result);
          // localStorage.setItem('user', result);
          // localStorage.setItem('token', result.token);
          this.loginService.loginstatus = true;

          if(this.loginService.redirectUrl == null){
            this.route.navigate(['/dashboard']);
          }
          else{
            this.route.navigate([this.loginService.redirectUrl]);
          }
          
          this.loginService.redirectUrl = null;
          this.snackbar.open('Login successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-style']
          });


        }
        else {
          this.loginService.loginstatus = false;
          this.snackbar.open('Login Failed !! Try Again', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });
        }
      }
    );
  }

}
