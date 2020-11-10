
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Hero, userRegister } from '../hero';
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
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]],
    lastName: ['', [Validators.required, Validators.minLength(3), Validators.pattern("^[a-zA-Z]+$")]],
    email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

  });

  onSubmit() {
    debugger;
    const registerObject: userRegister = {
     
      name: this.addHeroForm.controls.firstname.value,
      job: this.addHeroForm.controls.lastName.value,
      
    };
    this.heroService.addHero(registerObject).subscribe(res => console.log(res));
    setTimeout(() => {
      this.router.navigate(['/heroes']);
    }, 1000);

  }

  ngOnInit(): void {

  }



}
