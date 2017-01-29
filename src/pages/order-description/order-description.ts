import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the OrderDescription page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-order-description',
  templateUrl: 'order-description.html'
})
export class OrderDescriptionPage {
selectedMyOrder: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

  	this.selectedMyOrder = this.navParams.get('myOrder');
  	console.log("Your selected order is: ", this.selectedMyOrder);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDescriptionPage');
  }

}
