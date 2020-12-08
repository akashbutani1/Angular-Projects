import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styles: [
  ]
})
export class UserRegistrationComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  mainStepNo: number = 1;
  //@ViewChild('innerstepper') private myStepper: MatStepper;
  @ViewChild('stepper') private MainStepper: MatStepper;


  constructor(private _formBuilder: FormBuilder,
    private userservice: UserService,
    private snackbar: MatSnackBar,
    private route: Router) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      UserName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[ A-Za-z0-9_@./#&()+-]*$")]]
    });
    this.secondFormGroup = this._formBuilder.group({
      FirstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
      LastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]]
    });
    this.thirdFormGroup = this._formBuilder.group({
      Email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      PhoneNumber: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      DateOfBirth: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      Address: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  moveForward(stepper: MatStepper) {
    
    if (stepper.selectedIndex === stepper.steps.length - 1) {
      if (stepper.selectedIndex === this.MainStepper.steps.length - 1) {
        this.onSubmit();
      }
      else {
        this.MainStepper.next();
      }
    }
    else {
      stepper.next();
    }
  }

  moveBack(stepper: MatStepper) {
    if (stepper.selectedIndex == 0) {
      this.MainStepper.previous();
    }
    else {
      stepper.previous();
    }
  }


  onSubmit() {
    const registerObject = {
      UserName: this.firstFormGroup.controls.UserName.value,
      FirstName: this.secondFormGroup.controls.FirstName.value,
      LastName: this.secondFormGroup.controls.LastName.value,
      UserEmail: this.thirdFormGroup.controls.Email.value,
      PhoneNo: this.thirdFormGroup.controls.PhoneNumber.value,
      DateOfBirth: new Date(this.thirdFormGroup.controls.DateOfBirth.value),
      Address: this.fourthFormGroup.controls.Address.value,
    };

    this.userservice.addUsers(registerObject).pipe(first()).subscribe(result => {
      if (result != null) {

        this.snackbar.open('Data Added Successfully !!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-style']
        });
        this.route.navigate(['dashboard']);


      }
      else {
        this.snackbar.open('Error Occured !!', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar-style']
        });
      }
    });
  }

}
