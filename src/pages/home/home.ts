import { Component } from '@angular/core';
 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';           
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
 
  products: any;
 
  constructor(public http: Http) {
 
    this.http.get('https://www.ezmart.in/wp-json/wc/v1/products?consumer_key=ck_688fda4ec5e99c64dbc995c8e8270373f8b43f81&consumer_secret=cs_dca8a667e2990fc62885c5887465d23c12c21c8e').map(res => res.json()).subscribe(data => {
        this.products = data;
        console.log(this.products);
    },
    err => {
        console.log("Oops!");
    });
  
  }
}
    
  

