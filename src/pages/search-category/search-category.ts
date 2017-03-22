import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetCategory } from '../../providers/get-category';
import { ProductDetailPage } from '../product-detail/product-detail';
/*
  Generated class for the SearchCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search-category',
  templateUrl: 'search-category.html',
  providers: [GetCategory]
})
export class SearchCategoryPage {
categoryID: any;
public searchQuery: any = '';
public newZone: NgZone;
public noProducts: boolean= false;
public products: Array<any> = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public getCategory: GetCategory) {
  	this.categoryID = this.navParams.get('categoryID');
  	console.log('The category slug is: ', this.categoryID);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchCategoryPage');
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
	  
	this.newZone = new NgZone({}); 
	//trim function removes the spaces that exist in the searchQuery
	if (this.searchQuery.trim() !== '' && this.searchQuery.trim().length > 2) {
	        
	      this.getCategory.getProducts(this.searchQuery, this.categoryID).subscribe(products => {
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
