import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { AddEditEventComponent } from '../add-edit-event/add-edit-event.component';
import { CalenderService } from '../calender.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { EventModel } from '../EventModel';

@Component({
  selector: 'app-calender-list',
  templateUrl: './calender-list.component.html',
  styleUrls: ['./calender-list.component.css']
})
export class CalenderListComponent implements AfterViewInit {

  dataEvents: EventModel[] = [];
  displayedColumns: string[] = ['Id', 'Subject', 'StartTime', 'EndTime', 'action'];
  resultsLength = 0;
  filterValue: string;
  alertMessage: string = "There Is No Data For Search Value : ";
  isLoading : boolean = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;
  filter = new EventEmitter<void>();

  constructor(
    private calenderService: CalenderService,
    private dialog: MatDialog,
    private _snackbar: MatSnackBar, private route: Router) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page, this.filter)
      .pipe(
        startWith({}),
        switchMap(() => {
          
          return this.calenderService.getEventFromAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue);
        }),

        map(data => {
          this.isLoading = false;
          this.resultsLength = data.totalCount;
          return data.items;
        })
      ).subscribe(data => {
        console.log(data);
        this.isLoading = false;
        this.dataEvents = data;

      });
  }

  //routing
  routeToCalendar(pastevent: boolean) {
    debugger;
    if (pastevent) {
      this.route.navigate(['calender']);
    }
    else {
    }
  }

  //search filter
  searchFilter() {
    debugger;
    this.filterValue = this.searchValue.nativeElement.value;
    this.filter.emit();
    this.searchValue.nativeElement.value = "";
  }

  confirmDelete(event: EventModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Event : ' + event.subject,
        message: 'Are you sure to Remove this ?'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(event);

        this.dataEvents = this.dataEvents.filter(h => h !== event);
        this.resultsLength = this.resultsLength - 1;
        this._snackbar.open('Data Deleted Successfully', 'Close', {
          duration: 5000
        });
      }
    });

  }

  //add data
  addNew() {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: 0
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
       
       setTimeout(() => {
        this._snackbar.open('Data Added Successfully !!', 'Close', {
          duration: 5000
        });
       }, 1000);
        
      }
    });
  }

  //edit data
  editData(data : number) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        
        setTimeout(() => {
          this._snackbar.open('Data Edited Successfully ', 'Close', {
            duration: 5000
          });
        }, 1000);
        
      }
    });
  }

  //delete Data
  delete(event: EventModel): void {

    setTimeout(() => {
      this.calenderService.deleteEvent(event).subscribe(res => { console.log(res)
        ;
      });
    }, 1000);
  }

  //refresh Table
  refreshTable() {
    this.filterValue = "";
    this.filter.emit();
  }

}
