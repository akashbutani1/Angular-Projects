// import { HttpClient, HttpParameterCodec, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { HttpClientInMemoryWebApiModule, InMemoryDbService,RequestInfo } from 'angular-in-memory-web-api';
// import { Hero } from './hero';


// @Injectable({
//   providedIn: 'root',
// })
// export class InMemoryDataService implements InMemoryDbService {

  
//   createDb() {
//     debugger;
//     const heroes = [
//       { id: 11, name: 'Dr Nice', lastName: 'Hydrogen', nickName: 'H'},
//       { id: 12, name: 'Narco', lastName: 'Helium', nickName: 'He'     },
//       { id: 13, name: 'Bombasto', lastName: 'Lithium', nickName: 'Li'  },
//       { id: 14, name: 'Celeritas', lastName: 'Beryllium', nickName: 'Be' },
//       { id: 15, name: 'Magneta', lastName: 'Boron', nickName: 'Bo'   },
//       { id: 16, name: 'RubberMan', lastName: 'Carbon', nickName: 'C' },
//       { id: 17, name: 'Dynama' , lastName: 'Nitrogen', nickName: 'Ni'   },
//       { id: 18, name: 'Dr IQ', lastName: 'Oxygen', nickName: 'O'     },
//       { id: 19, name: 'Magma'  , lastName: 'Fluorine', nickName: 'F'   },
//       { id: 20, name: 'Tornado'  , lastName: 'Neon', nickName: 'Ne' }
//     ];  
  
    
//     //this.getFinalHeroes(heroes,this.httpOptions.get('sort'),this.httpOptions.get('order'),this.httpOptions.get('page'),this.httpOptions.get('pagesize'));
//     return {heroes};
//   }

  

//   // getFinalHeroes(heroData: Hero[],sort: string, order: string, page: string, pagesize: string): Hero[]{
//   //   debugger;
//   //   return heroData;
//   // }

//   genId(heroes: Hero[]): number {
//     return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
//   }
// }