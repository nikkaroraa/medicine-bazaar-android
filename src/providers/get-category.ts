import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the GetCategory provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class GetCategory {

  constructor(public http: Http) {
    console.log('Hello GetCategory Provider');
  }

  getAllCategories()
   {
   return this.http.get('https://www.medicinebazaar.in/wp-json/wc/v1/products/categories?consumer_key=ck_3a2b7fddd1fac4e6c7ea6cec3afc19259ef76c6b&consumer_secret=cs_5653cf147e9fe76f72a98a2b0d8e3728f0e9e129')
      .map(res => res.json()); 
   }

   getProducts(searchParam, id){
     console.log('https://www.medicinebazaar.in/wp-json/wc/v1/products?search='+searchParam+'&filter[product_cat]=' + id + '&consumer_key=ck_3a2b7fddd1fac4e6c7ea6cec3afc19259ef76c6b&consumer_secret=cs_5653cf147e9fe76f72a98a2b0d8e3728f0e9e129');
     return this.http.get('https://www.medicinebazaar.in/wp-json/wc/v1/products?search='+searchParam+'&filter[category]=' + id + '&consumer_key=ck_3a2b7fddd1fac4e6c7ea6cec3afc19259ef76c6b&consumer_secret=cs_5653cf147e9fe76f72a98a2b0d8e3728f0e9e129')
      .map(res => res.json());
   }

}
