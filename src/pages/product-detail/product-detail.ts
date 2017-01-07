import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchProduct } from '../../providers/search-product.service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
public itemUpsell: Array<any> = [];
public substitutes: Array<any> = [];
public product:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProduct: SearchProduct,public toastCtrl: ToastController,storage: Storage) {
      //storage try
       storage.set('product',"3");

     // Or to get a key/value pair
     storage.get('product').then((val) => {
       console.log('Your name is', "dalip");
     })
      //end storage try
      this.selectedItem = navParams.get('product');
      this.selectedItemName = this.selectedItem.name;
     /* for(var i =0; i < this.selectedItem.upsell_ids.length; i++){
      this.selectedItemUpSellId.push(this.selectedItem.upsell_ids[i]);
          console.log("The Ids are" + this.selectedItemUpSellId);
      }*/
console.log(this.selectedItem.upsell_ids.length);
console.log("The selected item name is:" + this.selectedItemName);
for(var j = 0; j < this.selectedItem.upsell_ids.length; j++){
console.log("Upsell Id: " + this.selectedItem.upsell_ids[j]);
this.itemUpsell.push(this.selectedItem.upsell_ids[j]);
//this.searchProducts(this.selectedItem);
console.log("The id's are " + this.itemUpsell);
}
this.searchProduct.load(this.selectedItemName)
    .then(data => {
        
    this.s_products = data;
console.log("The retrieved detailed product is" + this.s_products);

        
  });
for(var j=0; j< this.itemUpsell.length; j++){
this.searchProduct.loadById(this.itemUpsell[j])
   .then(data => {
    
    console.log("Value of "+ j + data);
this.substitutes.push(data);
    console.log(this.substitutes);
});
}
  }
  //toast for gocart bottom popup
   showToast(position:string,product) {
    console.log("buy product :")
    console.log(product);
       
   let toast = this.toastCtrl.create({
    message: 'Go to Payment',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

  toast.present(toast);
}
//end of toast
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

    
}
