import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { LoginRegisterService } from '../login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;
  
  constructor(private formbuilder : FormBuilder,private loginService : LoginRegisterService) { }

  ngOnInit(): void {

    this.loginForm = this.formbuilder.group({
      Email: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      Password: ['', [Validators.required, Validators.minLength(6), Validators.pattern("^[ A-Za-z0-9_]*$")]],
    });
  }

  onSubmit(){
    const registerObject = {
      Email : this.loginForm.controls.Email.value,
      Password : this.loginForm.controls.Password.value
    }

    this.loginService.checkUser(registerObject).pipe(first()).subscribe();
  }

}
