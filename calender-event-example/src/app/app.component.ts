import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CalendarOptions } from '@fullcalendar/angular';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  //selectedDate : Date = new Date();
  title = 'calender event example';

  constructor() { }

  // calendarOptions: CalendarOptions = {
  //   initialView: 'dayGridMonth',
  //   dateClick : this.handleDateClick.bind(this)


  // };

  // handleDateClick(arg : any) {
  //   this.selectedDate = arg.dateStr;    
  //   const dialogRef = this.dialog.open(AddEditEventComponent, {
  //     data: this.selectedDate
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //    // console.log(`Dialog result: ${result}`);
  //   });
  // }


}
