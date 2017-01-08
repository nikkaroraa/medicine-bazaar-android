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
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

    this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the Cart Page: ', val);
        this.cartItems.push(val);
        console.log("Cart Items on the Cart Page" + this.cartItems);
        console.log('First Item' + this.cartItems[0]);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

}
