import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Hero, HeroAPI } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  data: HeroAPI[] = [];
  @ViewChild('inputSearch') searchvalue: ElementRef;

  constructor(private heroService: HeroService, private _httpClient: HttpClient) { }
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