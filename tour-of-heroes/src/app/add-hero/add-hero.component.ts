
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero, HeroAPI, userRegister } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css']
})
export class AddHeroComponent implements OnInit {

  get name() {
    return this.addHeroForm.get('name');
  }

  get lastName() {
    return this.addHeroForm.get('lastName');
  }

  get nickName() {
    return this.addHeroForm.get('nickName');
  }

  constructor(
    private formBuilder: FormBuilder,
    private heroService: HeroService,
    private router: Router

  ) { }

  addHeroForm = this.formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]],
    nickName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]],

  });

  onSubmit() {
    debugger;
    const registerObject: HeroAPI = {
      id: 0,
      hero_name: this.addHeroForm.controls.firstName.value,
      hero_lastname: this.addHeroForm.controls.lastName.value,
      hero_nickname: this.addHeroForm.controls.nickName.value
      
    };
    this.heroService.addHero(registerObject).subscribe(res => console.log(res));
    setTimeout(() => {
      this.router.navigate(['/heroes']);
    }, 1000);

  }

  ngOnInit(): void {

  }



}
