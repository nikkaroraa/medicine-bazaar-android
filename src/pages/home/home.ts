import { Component } from '@angular/core';
 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';  
import { Product} from '../models/products';
import { Woocommerce } from '../providers/woocommerce';
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
 
  products:Product[];
 
  constructor(public http: Http,private woocommerce: Woocommerce) {
 
    woocommerce.load().subscribe(data => {
        this.products=data;
        console.log(this.products);
    },
    err => {
        console.log("Oops!");
    });
  
  }
}
    
  

