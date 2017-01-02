import { Component } from '@angular/core';
 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  
import { FetchProducts } from '../../providers/fetch-products.service';
         
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [ FetchProducts ]
})
export class HomePage {
 
  public products: any;
 
  constructor(public http: Http, public fetchProducts: FetchProducts) {
 
    this.loadProducts();
  
  }
loadProducts(){
  this.fetchProducts.load()
  .then(data => {
    this.products = data;
  });
}

}
    
  

