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
lastOrder: any;
lastOrderID: any;

orderDetails: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchProducts: FetchProducts) {

  	this.lastOrder = this.navParams.get('response');
  	this.lastOrderID = this.lastOrder.id;
  	
  	this.fetchProducts.retrieveOrder(this.lastOrderID).subscribe((data)=>{
  		this.orderDetails = data;
  		console.log(this.orderDetails);
  	},
  	(err)=>{
  		console.log(err);
  	});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LastOrderPage');
  }

}
