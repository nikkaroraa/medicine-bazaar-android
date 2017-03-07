import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FetchProducts } from '../../providers/fetch-products.service';
import {HomePage} from '../home/home';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchProducts: FetchProducts) {
    console.log("Hello");
  	this.lastOrderID = this.navParams.get('response');
  	console.log(this.lastOrderID);
  	
  	this.fetchProducts.retrieveOrder(this.lastOrderID).subscribe((data)=>{
  		this.orderDetails = data;
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
    this.navCtrl.setRoot(HomePage);
  }

}
