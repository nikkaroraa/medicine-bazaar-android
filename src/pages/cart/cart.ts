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
public costSum = 0;
public costSumString;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {
var that = this;
    this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the Cart Page: ', val);
        this.cartArray = val;
        

this.cartItems = this.cartArray;
console.log(this.cartItems);
this.cartItems.forEach(function(element, index){
     that.costSum += element.count*Number(element.price);
    that.costSumString = that.costSum.toFixed(2);
    console.log("Added: ", that.costSum);
  });
            });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }
  

  decreaseCount(product){
      var that = this;
    //  product.count--;
      this.cartItems.forEach(function(element, index){
         if(element.id == product.id){
             element.count--;
             console.log("Decremented the value in the cartItems array");
             that.storage.set('cartProducts', that.cartItems);
             console.log("Successfully made the changes in the storage element (Decremented)");
         } 
      }); 
      console.log("Count decreased by 1 for: ", product.name);
      this.costSum = this.costSum - Number(product.price);
      this.costSumString = this.costSum.toFixed(2);
  }
  increaseCount(product){
      var that = this;
   //   product.count++;
     this.cartItems.forEach(function(element, index){
         if(element.id == product.id){
             element.count++;
             console.log("Incremented the value in the cartItems array");
             that.storage.set('cartProducts', that.cartItems);
             console.log("Successfully made the changes in the storage element (Incremented)");
         } 
      }); 
      console.log("Count increased by 1 for: ", product.name);
      this.costSum = this.costSum + Number(product.price);
      this.costSumString = this.costSum.toFixed(2);
  }
}
