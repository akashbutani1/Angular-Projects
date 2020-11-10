
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
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements AfterViewInit {



  displayedColumns: string[] = ['id', 'email', 'firstname', 'lastname', 'delete'];
  data: Hero[] = [];
  searchWord: string;
  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') searchBox: ElementRef;

  constructor(private _httpClient: HttpClient,
    private heroService: HeroService,
    private dialog: MatDialog) { }

  ngAfterViewInit() {
    debugger;

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {

          return this.heroService.getHeroes(
            this.sort.active, this.sort.direction, this.paginator.pageIndex);
        }),

        map(data => {
          debugger;
          this.resultsLength = data["data"].length;
          if (this.sort.active === 'id')
            if (this.sort.direction === 'desc')
              data["data"].sort((a, b) => {
                return b.id - a.id;
              });
            else
              data["data"].sort((a, b) => {
                return a.id - b.id;
              });
          else
            if (this.sort.direction === 'asc')
              data["data"].sort((a, b) => {
                return a.email < b.email ? -1 : 1;
              });
            else
              data["data"].sort((a, b) => {
                return a.email < b.email ? 1 : -1;
              });


          return data;
        })
      ).subscribe(data => {
        debugger;
        this.data = data["data"];
      });
  }


  confirmDelete(hero: Hero) {
    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete Hero',
        message: 'Are you sure you want to remove a Hero : ' + hero.first_name
      }
    });
    confirmDialog.afterClosed().subscribe(result => {
      if (result === true) {
        this.delete(hero);
      }
    });

  }

  delete(hero: Hero): void {

    setTimeout(() => {
      this.heroService.deleteHero(hero).subscribe();
      this.heroService.getHeroes(this.sort.active, this.sort.direction, this.paginator.pageIndex).subscribe(
        data => {
          this.data = this.data.filter(h => h !== hero);
        }
      );
    }, 1000);
  }


  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === "") {
      this._httpClient.get<Hero[]>('https://reqres.in/api/users' + `?page=${this.paginator.pageIndex + 1}`).subscribe(
        data => {
          this.data = data["data"];
        }
      );
    }
    else {
      this.data = this.data.filter(s => s.first_name.toLowerCase().includes(filterValue.toLowerCase()) || s.email.toLowerCase().includes(filterValue.toLowerCase()) || s.last_name.toLowerCase().includes(filterValue.toLowerCase()));
      console.log(this.data);
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






