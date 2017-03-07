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
public newZone: NgZone;
   public products: Array<any> = [];
public s_products: any;
public searchQuery: any = '';
  items: string[];
public productDetail: any;
 public perpage: number = 2;
public start: number =1;
public offset: any = 0;
public canLoadMore : any = true;
public noProducts: boolean= false;


  constructor(public http: Http, public fetchProducts: FetchProducts, public searchProduct : SearchProduct, public navCtrl: NavController, public navParams: NavParams) {
  this.newZone = new NgZone({});    
   
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
   
      
      
var that = this;
  

//trim function removes the spaces that exist in the searchQuery
if (this.searchQuery.trim() !== '' && this.searchQuery.trim().length > 2) {
      
      this.fetchProducts.searchProducts(this.searchQuery).subscribe(products => {
        that.newZone.run( () => {  

          if(products.length){
            this.noProducts = false;
            that.products=products;
            console.log(that.products);
                      
          }else{
            this.noProducts = true;
          }
        
        });
        
      },
        err => {
        console.log(err);
        
    },
        () => {
        console.log('Completed');
    });
    }
}

 




}
