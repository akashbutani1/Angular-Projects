import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: [ './hero-detail.component.css' ]
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder
  ) {}

  updateHeroForm = this.formBuilder.group({
    heroFirstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    heroLastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    heroEmail: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    
  });

  ngOnInit(): void {
    
    
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero["data"]);
  }

  // goBack(): void {
  //   this.location.back();
  // }

  onSubmit(){
    debugger;
    this.hero.id = +this.route.snapshot.paramMap.get('id');;
    this.hero.email = this.updateHeroForm.value.heroEmail;
    this.hero.first_name = this.updateHeroForm.value.heroFirstName;
    this.hero.last_name = this.updateHeroForm.value.heroLastName;

    this.heroService.updateHero(this.hero)
    .subscribe(response => console.log(response));
  }
}