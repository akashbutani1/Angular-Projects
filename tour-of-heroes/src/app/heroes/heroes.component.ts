
import { AfterViewInit, ViewChild } from '@angular/core';
import { Component, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


import { HeroAPI } from '../hero';
import { HeroService } from '../hero.service';
import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements AfterViewInit {

  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'nickname', 'delete'];
  resultsLength = 0;
  newData: HeroAPI[] = [];
  filterValue: string;
  alertMessage: string = "There Is No Data For Search Value!!";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;

  constructor(
    private heroService: HeroService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar) { }


  ngAfterViewInit() {
    debugger;
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.heroService.getHeroesFromWebAPI(
            this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue);
        }),

        map(data => {
          this.resultsLength = data.length;
          return data;
        })
      ).subscribe(data => {
        debugger;
        this.newData = data.slice((this.paginator.pageIndex) * (this.paginator.pageSize), (this.paginator.pageIndex + 1) * (this.paginator.pageSize));
      });
  }


  //delete confirm dialog box 
  confirmDelete(hero: HeroAPI) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Hero',
        message: 'Are you sure you want to remove a Hero : ' + hero.hero_name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(hero);

        this.newData = this.newData.filter(h => h !== hero);
        this.resultsLength = this.resultsLength - 1;

      }
    });

  }

  //delete Data
  delete(hero: HeroAPI): void {

    setTimeout(() => {
      this.heroService.deleteHero(hero).subscribe(res => { console.log(res); });
    }, 1000);
  }



  //search filter
  searchFilter() {
    debugger;
    this.filterValue = this.searchValue.nativeElement.value;
    this.heroService.getHeroesFromWebAPI(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue).subscribe(
        response => {
          this.newData = response.slice((this.paginator.pageIndex) * (this.paginator.pageSize), (this.paginator.pageIndex + 1) * (this.paginator.pageSize));
          this.resultsLength = response.length;
          this.searchValue.nativeElement.value = "";
          
          if (this.resultsLength == 0) {
            this._snackBar.open(this.alertMessage, 'Close', {
              duration: 5000
            });
          }
        }
      );
  }


  //reset data after search
  resetDataTable() {
    this.filterValue="";
    this.heroService.getHeroesFromWebAPI(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.filterValue).subscribe(
        res => {
          this.newData = res.slice((this.paginator.pageIndex) * (this.paginator.pageSize), (this.paginator.pageIndex + 1) * (this.paginator.pageSize));
          this.resultsLength = res.length;
          this.searchValue.nativeElement.value = "";
        }
      );
  }



}


