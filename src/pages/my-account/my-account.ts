import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyOrdersPage } from '../my-orders/my-orders';
import { UpdateAccountInfoPage } from '../update-account-info/update-account-info';

/*
  Generated class for the MyAccount page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-account',
  templateUrl: 'my-account.html'
})
export class MyAccountPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAccountPage');
  }


  toMyOrders(){
  	this.navCtrl.push(MyOrdersPage);
  }

  toUpdateAccount(){
  	this.navCtrl.push(UpdateAccountInfoPage);
  }

  logout(){


  }
}
