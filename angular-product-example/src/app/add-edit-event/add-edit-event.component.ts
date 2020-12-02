import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { first } from 'rxjs/operators';
import { CalenderService } from '../calender.service';
import { EventModel } from '../EventModel';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.css']
})
export class AddEditEventComponent implements OnInit {

  constructor(private eventService: CalenderService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddEditEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) { }

  event: EventModel;
  id: number;
  isAddMode: boolean;
  eventForm: FormGroup;
  value1:string;
  value2:string;


  ngOnInit(): void {
    debugger;
    this.id = this.data;

    this.eventForm = this.formBuilder.group({
      subject: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
      description: ['', [Validators.required, Validators.minLength(5), Validators.pattern("^[a-zA-Z_ -]+$")]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      startTime: ['', [Validators.required]],
      EndTime: ['', [Validators.required]],


    });

    if (String(this.id) == "undefined" || this.id == 0) {
      this.isAddMode = true;
    }
    else {

      this.isAddMode = false;
      this.eventService.getEventById(this.id)
        .pipe(first())
        .subscribe(x => {
            var dt = new Date(x.startTime);
            var h = dt.getHours();
            var m = dt.getMinutes();
            this.value1 = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
            console.log(this.value1);

            var dt1 = new Date(x.endTime);
            var h1 = dt1.getHours();
            var m1= dt.getMinutes();
            this.value2 = (h1 > 12) ? (h1-12 + ':' + m1 +' PM') : (h1 + ':' + m1 +' AM');
            console.log(this.value2);
            
           
            
          this.eventForm.patchValue({
            subject: x.subject,
            description : x.description,
            startDate : new Date(x.startTime),
            endDate : new Date(x.endTime),
          });
        });
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    debugger;
    
    var s = this.eventForm.controls.startTime.value;
    var e =this.eventForm.controls.EndTime.value;

    var sss = s.toString().split(':');
    var ssh = sss[1].split(' '); //01
    var eee = e.toString().split(':');//01
    var eeh = eee[1].split(' ');


    var startdate = new Date(this.eventForm.controls.startDate.value);
    var enddate = new Date(this.eventForm.controls.endDate.value);
    startdate.setHours(sss[0],ssh[0],0,0);
    enddate.setHours(eee[0],eeh[0],0,0);

    console.log(startdate);
    

    const registerObject: EventModel = {
      
      id: this.data,
      subject: this.eventForm.controls.subject.value,
      description: this.eventForm.controls.description.value,

      startTime: startdate,
      endTime: enddate,
      isPastEvent: null

    };

    if(this.isAddMode){
      this.eventService.addEvent(registerObject)
      .subscribe(response => {
        //console.log(response);
        
      });
    }
    else{
      this.eventService.updateEvent(registerObject)
      .subscribe(response => {
        console.log(response);
        
      });
    }
    
  }
}
