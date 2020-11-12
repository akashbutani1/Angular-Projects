import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero, HeroAPI } from '../hero';
import { HeroService } from '../hero.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }

  updateHeroForm = this.formBuilder.group({
    heroFirstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    heroLastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
    heroNickName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],

  });

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    debugger;

    const registerObject: HeroAPI = {
      id: +this.route.snapshot.paramMap.get('id'),
      hero_name: this.updateHeroForm.controls.heroFirstName.value,
      hero_lastname: this.updateHeroForm.controls.heroLastName.value,
      hero_nickname: this.updateHeroForm.controls.heroNickName.value

    };

    this.heroService.updateHero(registerObject)
      .subscribe(response => {
        console.log(response);
        this.goBack();
      });
  }
}