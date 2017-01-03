import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';
/*
  Generated class for the SearchProduct provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SearchProduct {
perpage:number = 2;
  
  constructor(public http: Http) {
}


   load(productName: any) {

    return new Promise(resolve => {
      
      this.http.get('https://www.ezmart.in/wp-json/wc/v1/products?filter[name]='+productName+'&consumer_key=ck_688fda4ec5e99c64dbc995c8e8270373f8b43f81&consumer_secret=cs_dca8a667e2990fc62885c5887465d23c12c21c8e')
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
          
        },
        err => {
        console.log("Oops! There is some error in this.");
    },
        () => {
        console.log('Completed');
    });
    });
  } 
     

}
