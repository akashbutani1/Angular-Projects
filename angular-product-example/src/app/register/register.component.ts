import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {

  registerForm : FormGroup;
  
  constructor(private formbuilder : FormBuilder,private registerService : LoginRegisterService,
    private snackbar : MatSnackBar,private route :Router) { }

  ngOnInit(): void {

    //^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$ password
    this.registerForm = this.formbuilder.group({
      Username: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[ A-Za-z0-9_@.]*$")]],
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[ A-Za-z0-9_]*$")]],
    });
  }

  onSubmit(){
    const registerObject = {
      Email : this.registerForm.controls.Email.value,
      Username : this.registerForm.controls.Username.value,
      Password : this.registerForm.controls.Password.value
    }

    this.registerService.addUser(registerObject).pipe(first()).subscribe(
      result => {
        if(result != null){
          this.route.navigate(['/login']);
          this.snackbar.open('Registaration successful', 'Close', {
            duration: 3000,
            panelClass: ['snackbar-style']
          });
        }
        else{
          this.snackbar.open('Registration Failed : Duplicate Data', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar-style']
          });
        }
      }
    );
  }

}
