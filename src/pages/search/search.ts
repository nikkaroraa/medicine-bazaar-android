import { Component } from '@angular/core';
 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  
import { FetchProducts } from '../../providers/fetch-products.service';
import { SearchProduct } from '../../providers/search-product.service';
/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
    providers: [ FetchProducts , SearchProduct ]
})
export class SearchPage {

   public products: any;
public s_products: Array<any> = [];
searchQuery: string = '';
  items: string[];

 public perpage: number = 2;
public start: number =1;

  constructor(public http: Http, public fetchProducts: FetchProducts,public searchProduct : SearchProduct) {
      
    this.loadProducts();
  this.searchProducts();
this.initializeItems();
  }


initializeItems() {
    this.items = this.s_products;
  }
getItems(ev: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
loadProducts(){
  this.fetchProducts.load()
  .then(data => {
    this.products = data;
console.log(this.products);
  });
}
searchProducts(){
    this.searchProduct.load()
    .then(data => {
for(var i = 0; i < ( this.perpage*this.start ); i++){
 this.s_products.push(data[i].name);
  
//  console.log(data);
}
       
//this.start++;
//console.log(this.s_products);
console.log(this.s_products);
});
    
}
    
 

}
