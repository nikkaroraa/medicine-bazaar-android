import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchProduct } from '../../providers/search-product.service';


/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
providers: [ SearchProduct ]
})
export class ProductDetailPage {

selectedItem: any;
s_products: any;
 
  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProduct: SearchProduct) {
      this.selectedItem = navParams.get('item');
console.log(this.selectedItem);
//this.searchProducts(this.selectedItem);

this.searchProduct.load(this.selectedItem)
    .then(data => {
        
    this.s_products = data;
console.log(this.s_products);

    
  });
    
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

    
}
