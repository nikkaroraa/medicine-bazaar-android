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
 selectedItemName: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProduct: SearchProduct) {
      this.selectedItem = navParams.get('product');
      this.selectedItemName = this.selectedItem.name;
console.log("The selected item name is:" + this.selectedItemName);
//this.searchProducts(this.selectedItem);

this.searchProduct.load(this.selectedItemName)
    .then(data => {
        
    this.s_products = data;
console.log("The retrieved detailed product is" + this.s_products);

    
  });
    
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

    
}
