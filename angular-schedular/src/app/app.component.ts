import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { DayService, WeekService, WorkWeekService, MonthService, AgendaService, EventSettingsModel }
  from '@syncfusion/ej2-angular-schedule';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DayService, WeekService, WorkWeekService, MonthService, AgendaService]
})
export class AppComponent {

  public scheduleData: any;
  eventSettings: EventSettingsModel;

  
  constructor() {


    this.scheduleData = new DataManager({

      url: "https://localhost:44373/api/Schedule/GetData", // Mention the method name to get appointments data in initial load
      crudUrl: "https://localhost:44373/api/Schedule/Batch", // Mention the method name to perform CRUD operations
      adaptor: new UrlAdaptor(),
      crossDomain: true
    });
    this.eventSettings = { dataSource: this.scheduleData };

  }


}
