import { ViewChild } from '@angular/core';
import { Component, ElementRef, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: [ './hero-search.component.css' ]
})
export class HeroSearchComponent implements OnInit {
  
  private searchTerms = new Subject<string>();
  

  constructor(private heroService: HeroService) {}

  // @ViewChild('searchBox') searchBox: ElementRef;
  // // Push a search term into the observable stream.
  // search(): void {
  //   this.searchTerms.next(this.searchBox.nativeElement.value);
  // }

  ngOnInit(): void {
    // this.heroes$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
      
      
    //   switchMap((term: string) => this.heroService.searchHeroes(term)),
    // );
    // console.log(this.heroes$);
    
    
  }
}
