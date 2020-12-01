import { Component, OnInit } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel, PopupOpenEventArgs }
  from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class CalenderComponent implements OnInit {

  public scheduleData: any;
  eventSettings: EventSettingsModel;
  minValidation: (args: { [key: string]: string }) => boolean = (args: { [key: string]: string }) => {
    return args['value'].length >= 5;
  };

  constructor() {

    this.scheduleData = new DataManager({

      url: "https://localhost:44385/api/ScheduleAppointments/",
      crudUrl: "https://localhost:44385/api/ScheduleAppointments/",
      adaptor: new UrlAdaptor(),
      crossDomain: true
    });
    
    this.eventSettings = {
      dataSource: this.scheduleData,
      fields: {
        id: 'Id',
        subject: { name: 'Subject', validation: { required: true } },
        location: { name: 'Location', validation: { required: true } },
        description: {
          name: 'Description', validation: {
            required: true, minLength: [this.minValidation, 'Need atleast 5 letters to be entered']
          }
        },
        startTime: { name: 'StartTime', validation: { required: true } },
        endTime: { name: 'EndTime', validation: { required: true } }
      }
    };

  }

  onPopupOpen(args: PopupOpenEventArgs): void {
    if (args.type === 'QuickInfo')  {
        args.cancel = true;
    }
}

  ngOnInit(): void {
    
  }
  

}
