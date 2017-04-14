import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import {AddressPage} from '../address/address';
import { CheckoutPage } from '../checkout/checkout';
import firebase from 'firebase';
import {HomePage} from '../home/home';
import {SelectAddressPagePage} from '../select-address-page/select-address-page';
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
billingExists: boolean= false;
userUID: any;
user: any;
userProfilium: any;
hasProducts: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,
    public toastCtrl: ToastController) {
var that = this;
      this.costSumString = this.costSum.toFixed(2);
    this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the Cart Page: ', val);
      
if(val){

  this.cartArray = val;
  if(this.cartArray.length){
   that.hasProducts = true;     
    this.cartItems = this.cartArray;
console.log(this.cartItems);
this.cartItems.forEach(function(element, index){
     that.costSum += element.count*Number(element.price);
    that.costSumString = that.costSum.toFixed(2);
    console.log("Added: ", that.costSum);
  });
  }else{
    that.hasProducts = false; 
  }


      
}else{
  this.cartArray = [];
  this.cartItems = [];
  that.hasProducts = false;
}
              });


if(firebase.auth().currentUser){
            //alert('User Exists');
            //alert("User" + firebase.auth().currentUser);
             that.storage.get('customerContact').then((details)=>{
      if(details){
        console.log("customerContactTrue", details);
        that.billingExists = true;
      }else{
        console.log("customerContactFalse", details);
        that.billingExists = false;
      }
      });         
         
          }else if(!firebase.auth().currentUser){
            console.log('User doesn\'t exist');
          }
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
 
 //go to checkout page
 goToCheckOut()
 { 
   
   if(this.billingExists && this.hasProducts)
     {this.navCtrl.push(SelectAddressPagePage);}
     else if(!this.billingExists && this.hasProducts)
       {this.navCtrl.push(AddressPage);}
     else if(!this.hasProducts){
       let toast = this.toastCtrl.create({
        message: 'Cart is empty',
        duration: 2000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(HomePage); 
      });

      toast.present(toast);
     }
   
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
      if(!this.costSum){
        this.hasProducts = false; 
      }
      this.costSumString = this.costSum.toFixed(2);
  }    
}
