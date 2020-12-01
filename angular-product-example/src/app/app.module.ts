import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductListComponent } from './product-list/product-list.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { ScheduleModule, RecurrenceEditorModule, DayService, WeekService, MonthAgendaService, MonthService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';
import { CalenderComponent } from './calender/calender.component';
import { CalenderListComponent } from './calender-list/calender-list.component';


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    CategoryListComponent,
    AddEditCategoryComponent,
    ConfirmDialogComponent,
    DashboardComponent,
    AddEditProductComponent,
    CalenderComponent,
    CalenderListComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    MatButtonModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTabsModule
    , MatDialogModule, MatToolbarModule, MatSelectModule, MatSnackBarModule,
    ScheduleModule, RecurrenceEditorModule,
    MatProgressSpinnerModule
  ],
  providers: [DayService, WeekService, MonthAgendaService, MonthService, WorkWeekService],
  bootstrap: [AppComponent]
})
export class AppModule { }
