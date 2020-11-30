import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ScheduleModule, RecurrenceEditorModule, DayService , WeekService , MonthAgendaService , MonthService ,WorkWeekService } from '@syncfusion/ej2-angular-schedule';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ScheduleModule, RecurrenceEditorModule
  ],
  providers: [DayService , WeekService , MonthAgendaService , MonthService ,WorkWeekService],
  bootstrap: [AppComponent]
})
export class AppModule { }
