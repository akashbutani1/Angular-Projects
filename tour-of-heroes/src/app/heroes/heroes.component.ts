
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


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements AfterViewInit {



  displayedColumns: string[] = ['id', 'firstname', 'lastname', 'nickname', 'delete'];
  data: Hero[] = [];
  searchWord: string;
  resultsLength = 0;
  newData: HeroAPI[] = [];
  filterValue: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') searchBox: ElementRef;

  constructor(private _httpClient: HttpClient,
    private heroService: HeroService,
    private dialog: MatDialog,
    private router: Router) { }


  ngAfterViewInit() {
    debugger;

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
        console.log(this.newData);

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
      }
    });

  }

  delete(hero: HeroAPI): void {

    setTimeout(() => {
      this.heroService.deleteHero(hero).subscribe(res => {console.log(res);});
      this.newData = this.newData.filter(h => h !== hero);      
    }, 1000);
  }

  


  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === "") {
      this._httpClient.get<Hero[]>('https://reqres.in/api/users' + `?page=${this.paginator.pageIndex + 1}`).subscribe(
        data => {
          this.data = data["data"];
          this.resultsLength = this.data.length * 2;
        }
      );
    }
    else {
      this._httpClient.get<Hero[]>('https://reqres.in/api/users' + `?page=${this.paginator.pageIndex + 1}`).subscribe(
        data => {
          this.data = data["data"];
          this.data = this.data.filter(s => s.first_name.toLowerCase().includes(filterValue.toLowerCase()) || s.email.toLowerCase().includes(filterValue.toLowerCase()) || s.last_name.toLowerCase().includes(filterValue.toLowerCase()));
          this.resultsLength = this.data.length;
          console.log(this.resultsLength);
        }
      );
    }

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






