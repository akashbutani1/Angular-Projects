import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin
import interactionPlugin from '@fullcalendar/interaction';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatDialogModule } from '@angular/material/dialog'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input'
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditEventComponent } from './add-edit-event/add-edit-event.component';
import { ScheduleModule, RecurrenceEditorModule , DayService, WeekService, WorkWeekService , MonthService , MonthAgendaService} from '@syncfusion/ej2-angular-schedule';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,interactionPlugin

]);

@NgModule({
  declarations: [
    AppComponent,
    AddEditEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FullCalendarModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule, FormsModule, ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),MatInputModule,NgxMaterialTimepickerModule, 
    ScheduleModule, 
    RecurrenceEditorModule
  ],
  providers: [ DayService, WeekService, WorkWeekService , MonthService , MonthAgendaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
