import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FetchProducts } from '../../providers/fetch-products.service';
 
/*
  Generated class for the LastOrder page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-last-order',
  templateUrl: 'last-order.html',
  providers: [FetchProducts]
})
export class LastOrderPage {
public lastOrder: any = {};
public lastOrderID: any = {};

public orderDetails: any = {};
public orderShipping: any = {};
subTotal: any = 0;
orderTotal: any = 0;
discountAmount: any = 0;
public couponApplied: any = {};
couponDiscount: boolean = false; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchProducts: FetchProducts) {
    var that = this;
    console.log("Hello");
  	this.lastOrderID = this.navParams.get('response');
  	console.log(this.lastOrderID);
  	this.subTotal = 0;
  	this.fetchProducts.retrieveOrder(this.lastOrderID).subscribe((data)=>{
  		this.orderDetails = data;
      this.couponDiscount = false;
      if(data.coupon_lines[0]){
        this.couponDiscount = true;
        this.couponApplied = data.coupon_lines[0];


      this.orderDetails.line_items.forEach(function(element, index){
       that.subTotal += Number(element.subtotal);
      element.price = (Number(element.subtotal))/(element.quantity);
  });
      this.orderTotal = Number(this.orderDetails.total);
      console.log(this.orderTotal);
      console.log("this.subTotal ", this.subTotal);
      this.discountAmount =  (this.subTotal - this.orderTotal).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }else{
this.couponDiscount = false;

     this.orderDetails.line_items.forEach(function(element, index){
       that.subTotal += Number(element.subtotal);
      element.price = (Number(element.subtotal))/(element.quantity);
  });
   this.orderTotal = this.subTotal;
      console.log(this.orderTotal);
      console.log("this.subTotal ", this.subTotal);
     // this.discountAmount =  (this.subTotal - this.orderTotal).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
    }
      
      console.log(this.orderDetails);
      this.orderShipping = data.shipping;
  	},
  	(err)=>{
  		console.log(err);
  	});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LastOrderPage');
  }

  goToHome(){
    this.navCtrl.popToRoot();
  }

}
