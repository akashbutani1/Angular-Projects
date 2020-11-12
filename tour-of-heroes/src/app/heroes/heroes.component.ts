
import { AfterViewInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';


import { Hero, HeroAPI } from '../hero';
import { HeroService } from '../hero.service';
import { merge } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
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
  durationInSeconds = 3;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputSearch') searchValue: ElementRef;

  constructor(private _httpClient: HttpClient,
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
        // console.log(this.newData);

      });
  }


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

  delete(hero: HeroAPI): void {

    setTimeout(() => {
      this.heroService.deleteHero(hero).subscribe(res => { console.log(res); });
    }, 1000);
  }




  searchFilter() {
    debugger;
    this.heroService.getHeroesFromWebAPI(
      this.sort.active, this.sort.direction, this.paginator.pageIndex, this.searchValue.nativeElement.value).subscribe(
        response => {
          this.newData = response.slice((this.paginator.pageIndex) * (this.paginator.pageSize), (this.paginator.pageIndex + 1) * (this.paginator.pageSize));
          this.resultsLength = response.length;
          console.log(this.resultsLength);
          this.searchValue.nativeElement.value="";
          if(this.resultsLength == 0){
            this._snackBar.open(this.alertMessage,'Close', {
              duration: this.durationInSeconds * 1000
            });
          }
        }
      );
  }

  

  resetDataTable(){
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



























  // heroes: Hero[];
  // dataSource: any;

  // //pageEvent: PageEvent;
  // displayedColumns: string[] = ['id', 'name', 'lastName', 'nickName'];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;


  // constructor(
  //   private heroService: HeroService,
  //   private dialog: MatDialog,
  //   private http : HttpClient
  // ) { }



  // ngOnInit() {

  //   this.getUsers();
  // }

  // public getUsers() {
  //   this.http.get('https://reqres.in/api/users').subscribe(res => {
  //     this.dataSource = res["data"];
  //     this.dataSource.paginator = this.paginator;
  //     this.dataSource.sort = this.sort;

  //   });
  // }

  // getHeroes(): void {

  //   this.heroService.getHeroes()
  //     .subscribe(response => {

  //       this.dataSource = new MatTableDataSource(response);
  //       this.dataSource.paginator = this.paginator;
  //       this.dataSource.sort = this.sort;


  //     });

  // }

  // ngAfterViewInit() {
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //   merge(this.sort.sortChange,this.paginator.pageIndex)
  //     .pipe(

  //       startWith({}),
  //       switchMap(() => {

  //         return this.heroService.getHeroes();
  //         }),

  //         map(data => {
  //           console.log(data);
  //           return data;
  //         })
  //     ).subscribe(data =>{
  //       this.dataSource =  data["data"]
  //       this.dataSource.paginator = this.paginator;
  //     });


  // }





  // confirmDelete(hero: Hero) {
  //   const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
  //     data: {
  //       title: 'Confirm Remove Hero',
  //       message: 'Are you sure, you want to remove a Hero: ' + hero.name
  //     }
  //   });
  //   confirmDialog.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       this.delete(hero);
  //     }
  //   });

  // }

  // delete(hero: Hero): void {

  //   setTimeout(() => {
  //     this.heroService.deleteHero(hero).subscribe();
  //     this.getHeroes();
  //   }, 1000);

  //   this.dataSource = this.dataSource.filter(h => h !== hero);

  // }






