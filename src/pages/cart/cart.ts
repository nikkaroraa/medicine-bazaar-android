import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {  TabsPage } from '../tabs/tabs';
import {AddressPage} from '../address/address';
/*
  Generated class for the Cart page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
  
}) 
export class CartPage {
public cartItems: Array<any> = [];
public cartArray: Array<any> = [];
public costSum = 0;
public costSumString;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
var that = this;
      this.costSumString = this.costSum.toFixed(2);
    this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the Cart Page: ', val);
      
if(val){

  this.cartArray = val;
        

this.cartItems = this.cartArray;
console.log(this.cartItems);
this.cartItems.forEach(function(element, index){
     that.costSum += element.count*Number(element.price);
    that.costSumString = that.costSum.toFixed(2);
    console.log("Added: ", that.costSum);
  });
      
}else{
  this.cartArray = [];
  this.cartItems = [];
  
}
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
             if(element.count <= 1){
                that.deleteItem(element);   
                 
             }else{
             element.count--;
             console.log("Decremented the value in the cartItems array");
             that.storage.set('cartProducts', that.cartItems);
             console.log("Successfully made the changes in the storage element (Decremented)");
                 console.log("Count decreased by 1 for: ", product.name);
      that.costSum = that.costSum - Number(product.price);
      that.costSumString = that.costSum.toFixed(2);
             }
         } 
      }); 
      
  }
 //login or signup page 
 gotologin()
 {
     console.log("login");
  this.navCtrl.push(TabsPage);   
 }
 //go to checkout page
 goToCheckOut()
 {
   this.navCtrl.push(AddressPage);
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
  deleteItem(product){
      var that = this;
      this.cartItems.forEach(function(element, index){
         if(element.id == product.id){
             
             that.cartItems.splice(index, 1);
             
             console.log("Item removed from the array");
             that.storage.set('cartProducts', that.cartItems);
             that.storage.set('productCount', that.cartItems.length);
             console.log("Successfully made the changes in the storage element (Deleted)");
         } 
      }); 
      console.log("Product.count here is:", product.count);
        this.costSum = this.costSum - product.count*Number(product.price);
      console.log("Last Cost sum", this.costSum);
      this.costSumString = this.costSum.toFixed(2);
  }    
}
