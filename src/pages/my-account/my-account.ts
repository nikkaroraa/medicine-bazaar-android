import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { MyOrdersPage } from '../my-orders/my-orders';
import { UpdateAccountInfoPage } from '../update-account-info/update-account-info';
import { AuthData } from '../../providers/auth-data';
import {HomePage} from '../home/home';
import { Storage } from '@ionic/storage';
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
loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData, public storage: Storage,
    public loadingCtrl: LoadingController) {}

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
      this.authData.logoutUser().then((success)=>{
      //this.storage.remove('userDetails');
      this.storage.remove('userDetails');
      this.successLogout();
      
    }, (error)=>{
      console.log('Error:', error);
    });

  }
   successLogout(){

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Logout Successfull! Please Wait...'
    });

    this.loading.present();

    setTimeout(() => {
     this.navCtrl.setRoot(HomePage);
    }, 1000);

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);

  }
}
