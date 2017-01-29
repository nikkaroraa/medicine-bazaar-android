import { Component, NgZone } from '@angular/core';
 
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
zone: NgZone;
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
search(searchEvent) {
    this.searchQuery = searchEvent.target.value;
    // We will only perform the search if we have 3 or more characters
   // if (term.trim() === '' || term.trim().length < 3) {
      
      // Get the searched users from github
this.offset=0;
var that = this;
  this.zone = new NgZone({});
console.log("Typed value is: " + this.searchQuery + "Offset Value is: " + this.offset);
if (this.searchQuery.trim() !== '' && this.searchQuery.trim().length > 1) {
      this.fetchProducts.searchProducts(this.searchQuery).subscribe(products => {
        

          if(products.length){

            that.products=products;
            console.log(that.products);
          }else{
            console.log("There isn't any listed with this name. Try with a different search.");
          }
        
        
        
      });
    }if (this.searchQuery.trim() !== '' || this.searchQuery.trim().length > 3) {

  }
}

 


}
