import { Component } from '@angular/core';
 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  
import { FetchProducts } from '../../providers/fetch-products.service';
import { SearchProduct } from '../../providers/search-product.service';
import { NavController, NavParams} from 'ionic-angular';
import { ProductDetailPage} from '../product-detail/product-detail';
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

   public products: Array<any> = [];
public s_products: any;
public searchQuery: any = '';
  items: string[];
public productDetail: any;
 public perpage: number = 2;
public start: number =1;
public offset: any = 0;
public canLoadMore : any = true;

  constructor(public http: Http, public fetchProducts: FetchProducts, public searchProduct : SearchProduct, public navCtrl: NavController, public navParams: NavParams) {
      
   // this.loadProducts();
 // this.searchProducts();
//this.initializeItems(); //for hiding the products at the time of page loading
  }

 itemTapped(event, product) {
    this.navCtrl.push(ProductDetailPage, {
      product: product
    });
console.log("itemTapped:" + product);
  }
/*initializeItems() {
    this.items = this.products;
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
*/
search(searchEvent) {
    this.searchQuery = searchEvent.target.value;
    // We will only perform the search if we have 3 or more characters
   // if (term.trim() === '' || term.trim().length < 3) {
      
      // Get the searched users from github
this.offset=0;
console.log("Typed value is:" + this.searchQuery + "Offset Value is dsd:" + this.offset);
if (this.searchQuery.trim() !== '' || this.searchQuery.trim().length > 3) {
      this.fetchProducts.searchProducts(this.searchQuery).subscribe(products => {
        this.products=products;
console.log(this.products);
      });
    }if (this.searchQuery.trim() !== '' || this.searchQuery.trim().length > 3) {

  }
}

/* doInfinite(infiniteScroll: any) {
    console.log('Begin async operation');

    setTimeout(() => {
      
    // We will only perform the search if we have 3 or more characters
   // if (term.trim() === '' || term.trim().length < 3) {
      
      // Get the searched users from github
console.log("Typed value is:" + this.searchQuery + "Offset Value is:" + this.offset);

      this.fetchProducts.searchProducts(this.searchQuery, this.offset).subscribe(products => {
        this.products.push(products);
console.log(this.products);

//if(products.length < 10){
  //  this.canLoadMore = false;
//console.log("No more products");
//return;
//}else{

//}
      });
    


      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }
*/
/*loadProducts(){
  this.fetchProducts.load()
  .then(data => {;
for(var i = 0; i < ( data.length ); i++){
 this.products.push(data[i]);
  //this.productDetail.push(data[i]);
//  console.log(data);
}
       
//this.start++;
//console.log(this.s_products);
console.log(this.products);
  });
}
*/
/*searchProducts(){
    this.searchProduct.load()
    .then(data => {
        
    this.s_products = data;
console.log(this.s_products);
for(var i = 0; i < ( this.perpage*this.start ); i++){
 this.s_products.push(data[i].name);
  
//  console.log(data);
}
       
//this.start++;
//console.log(this.s_products);
console.log(this.s_products);
});
    
}
*/    
 


}
