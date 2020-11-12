import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {  HeroAPI } from '../hero';
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

  @ViewChild('inputSearch') searchvalue: ElementRef;

  constructor(private heroService: HeroService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder) { }
  resultLength = 0;
  ngOnInit() {
    this.getHeroes();
    this.searchForm = this.formBuilder.group({
      searchField: ['', [Validators.required]]
  
    });

  }

  getHeroes(): void {
    this.heroService.getHeroesAngular().subscribe(
      res => {
        this.data = res;
        this.data = this.data.slice(0,20);
      }
    );
  }


  searchFilter() {
    debugger;
    this.heroService.searchHeroesDashboard(this.searchForm.controls.searchField.value).subscribe(
        response => {
          this.data = response;
          if(response.length == 0){
            this._snackBar.open(this.alertMessage + this.searchForm.controls.searchField.value,'Close', {
              duration: this.durationInSeconds * 1000
            });
          }
          else{
            this._snackBar.open('Data Found For : ' + this.searchForm.controls.searchField.value ,'Close', {
              duration: this.durationInSeconds * 1000
            });
          }
          this.searchForm.reset();
        }
      );
  }

  

  resetDataTable(){
    this.heroService.getHeroesAngular().subscribe(
      response => {
        this.data = response.slice(0,20);
        this.searchvalue.nativeElement.value="";
        this._snackBar.open('Refreshed Table As you wished !!','Close', {
          duration: this.durationInSeconds * 1000
        });
      }
    );
  }


}