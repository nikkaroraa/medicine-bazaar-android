import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Product } from '../models/products';
import { Observable } from  'rxjs/Rx';

/*
  Generated class for the Woocommerce provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Woocommerce {
   
  constructor(public http: Http) {
    console.log('Hello Woocommerce Provider');
  }
 load(): Observable<Product[]> {
     return this.http.get('https://www.ezmart.in/wp-json/wc/v1/products?consumer_key=ck_688fda4ec5e99c64dbc995c8e8270373f8b43f81&consumer_secret=cs_dca8a667e2990fc62885c5887465d23c12c21c8e').map(res => <Product[]> res.json())
 }

}
