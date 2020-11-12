import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Hero, HeroAPI } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  data: HeroAPI[] = [];

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

  applyFilter(event: Event) {
    debugger;
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue === "") {
      this._httpClient.get<Hero[]>('https://reqres.in/api/users' + `?page=${1}`).subscribe(
        data => {
          this.heroes = data["data"];
        }
      );
    }
    else {
      this._httpClient.get<Hero[]>('https://reqres.in/api/users' + `?page=${1}`).subscribe(
        data => {
          this.heroes = data["data"];
          this.heroes = this.heroes.filter(s => s.first_name.toLowerCase().includes(filterValue.toLowerCase()));
        }
      );
    }

  }
}