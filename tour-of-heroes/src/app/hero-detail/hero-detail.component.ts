import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroAPI } from '../hero';
import { HeroService } from '../hero.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  hero: HeroAPI;
  id: number;
  isAddMode: boolean;
  updateHeroForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private formBuilder: FormBuilder
  ) { }



  ngOnInit(): void {
    debugger;
    const id = +this.route.snapshot.paramMap.get('id');

    this.updateHeroForm = this.formBuilder.group({
      heroFirstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
      heroLastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],
      heroNickName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z_ -]+$")]],

    });

    if (id != 0) {
      this.isAddMode = false;
      this.heroService.getHero(id)
        .pipe(first())
        .subscribe(x => {
          console.log(x);

          this.updateHeroForm.patchValue({
            heroFirstName: x.hero_name,
            heroLastName: x.hero_lastname,
            heroNickName: x.hero_nickname
          });
        });
    }
    else {
      this.isAddMode = true;
    }


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

    if (this.isAddMode) {
      this.heroService.addHero(registerObject).subscribe(res => {
        console.log(res);
        this.goBack();
      });
    }
    else {
      this.heroService.updateHero(registerObject)
        .subscribe(response => {
          console.log(response);
          this.goBack();
        });
    }

  }
}