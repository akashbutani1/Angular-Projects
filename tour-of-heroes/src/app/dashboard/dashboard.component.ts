import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HeroAPI } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: HeroAPI[] = [];
  alertMessage: string = "There Is No Data For Search Value : ";
  durationInSeconds = 3;
  searchForm: FormGroup;
  resultLength = 0;
  noDataFound: boolean = false;

  @ViewChild('inputSearch') searchValue: ElementRef;


  constructor(private heroService: HeroService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroesAngular().subscribe(
      res => {
        this.data = res;
        this.data = this.data.slice(0, 20);
      }
    );
  }


  searchFilter() {
    debugger;
    this.noDataFound = false;
    this.heroService.searchHeroesDashboard(this.searchValue.nativeElement.value).subscribe(
      response => {
        this.data = response;
        if(this.data.length == 0){
          this.noDataFound = true;
        }
      }
    );
  }



  resetDataTable() {
    this.noDataFound = false;
    this.heroService.getHeroesAngular().subscribe(
      response => {
        this.data = response.slice(0, 20);
        this._snackBar.open('Refreshed Data As you wished !!', 'Close', {
          duration: this.durationInSeconds * 1000
        });
      }
    );
  }


}