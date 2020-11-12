import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Hero, HeroAPI } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: HeroAPI[] = [];
  alertMessage: string = "There Is No Data For Search Value!!";
  durationInSeconds = 3;

  @ViewChild('inputSearch') searchvalue: ElementRef;

  constructor(private heroService: HeroService, private _snackBar: MatSnackBar) { }
  resultLength = 0;
  ngOnInit() {
    this.getHeroes();

  }

  getHeroes(): void {
    this.heroService.getHeroesAngular().subscribe(
      res => {
        this.data = res;
      }
    );
  }


  searchFilter() {
    debugger;
    this.heroService.searchHeroesDashboard(this.searchvalue.nativeElement.value).subscribe(
        response => {
          this.data = response;
          this.searchvalue.nativeElement.value="";
          if(response.length == 0){
            this._snackBar.open(this.alertMessage,'Close', {
              duration: this.durationInSeconds * 1000
            });
          }
        }
      );
  }

  

  resetDataTable(){
    this.heroService.searchHeroesDashboard(this.searchvalue.nativeElement.value).subscribe(
      response => {
        this.data = response;
        this.searchvalue.nativeElement.value="";
      }
    );
  }


}