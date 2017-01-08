import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
public cartItems: Array<any> = [];
public cartArray: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the Cart Page: ', val);
        this.cartArray.push(val);
        if(val.length>1){console.log("Cart Items on the Cart Page" + this.cartArray);
        console.log('First Item' + this.cartArray[0]);

this.cartItems.push(this.cartArray[0]);
console.log(this.cartItems);
}else{
    

this.cartItems = this.cartArray;
console.log(this.cartItems);

}
            });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
