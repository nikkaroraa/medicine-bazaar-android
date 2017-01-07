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

  
  constructor(public http: Http) {
}


   load(productName: any) {

    return new Promise(resolve => {
      
      this.http.get('https://www.medicinebazaar.in/wp-json/wc/v1/products?filter[name]='+productName+'&consumer_key=ck_f5801ed200d3c77e22b29a02b108928363f8b655&consumer_secret=cs_87191385746051414467143670e0c915ac37bf0a')
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
