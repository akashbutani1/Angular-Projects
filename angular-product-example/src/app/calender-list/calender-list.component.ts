import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { CalenderService } from '../calender.service';
import { EventModel } from '../EventModel';

@Component({
  selector: 'app-calender-list',
  templateUrl: './calender-list.component.html',
  styleUrls: ['./calender-list.component.css']
})
export class CalenderListComponent implements AfterViewInit {

  dataEvents : EventModel[] = [];
  displayedColumns: string[] = ['Id', 'Subject', 'StartTime','EndTime'];
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private calenderService : CalenderService) { }

  ngAfterViewInit() {

    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          
          return this.calenderService.getEventFromAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),

        map(data => {
          debugger;
          
          this.resultsLength = data.totalCount;
          return data.items;
        })
      ).subscribe(data => {
        debugger;
        console.log(data);
        
        this.dataEvents = data;
       // console.log(this.dataCategory);
        
      });
  }

}
