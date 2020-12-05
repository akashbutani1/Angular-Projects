import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { merge } from 'rxjs';
import { first, map, startWith, switchMap } from 'rxjs/operators';
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
          const registerObject = {
            Sort:this.sort.active,
            Order:this.sort.direction,
            PageNumber:this.paginator.pageIndex + 1,
            SearchQuery: this.filterValue
          }
          return this.calenderService.getEventFromAPI(
            registerObject);
        }),

        map(data => {
          this.isLoading = false;
          this.resultsLength = data.totalCount;
          return data.items;
        })
      ).subscribe(data => {
        this.isLoading = false;
        this.dataEvents = data;

      });
  }

  //routing
  routeToCalendar(pastevent: boolean) {
    
    if (pastevent) {
      this.route.navigate(['calender']);
    }
    else {
    }
  }

  //search filter
  searchFilter() {
    
    this.filterValue = this.searchValue.nativeElement.value;
    this.filter.emit();
    this.searchValue.nativeElement.value = "";
  }

  confirmDelete(event: EventModel) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Event : ' + event.subject,
        message: 'Are you sure to Remove this ?',
        DialogData : event,
        type : 'event'
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === 1) {

        this.dataEvents = this.dataEvents.filter(h => h !== event);
        this.resultsLength = this.resultsLength - 1;
      }
    });

  }

  //add data
  addEditData(data : number) {
    const dialogRef = this.dialog.open(AddEditEventComponent, {
      data: data
    });

    dialogRef.afterClosed().subscribe(result => {
      this.refreshTable();
      if (result === 1) {
        
      }
    });
  }

  

  

  //refresh Table
  refreshTable() {
    this.filterValue = "";
    this.filter.emit();
  }

}
