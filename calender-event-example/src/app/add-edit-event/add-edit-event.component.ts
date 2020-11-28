import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {

  selectedDate : Date = new Date();
  eventForm : FormGroup;

  constructor(public dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private formBuilder : FormBuilder) { }

  ngOnInit(): void {
    this.selectedDate = this.data;

    this.eventForm = this.formBuilder.group({
      eventName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
      eventDate: ['', [Validators.required]],
      eventStartTime: ['', [Validators.required]],
      eventEndTime: ['', [Validators.required]]
    });
    // Validators.pattern("/^(0?[1-9]|1[012])(:[0-5]\d) [APap][mM]$/")
    // Validators.pattern("/b(0?\d|1[0-2]):[0-5]\d (AM|PM)/")
    // Validators.pattern("/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/")


  }

  onNoClick(){
    this.dialogRef.close();
  }

  onSubmit(){
    console.log(this.eventForm.value);
  }
}
