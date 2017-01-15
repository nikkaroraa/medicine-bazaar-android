import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AuthData } from '../../providers/auth-data';
import {AccountPage} from '../account/account';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Logout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html'
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public authData: AuthData, public storage: Storage) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }
  logoutUser(){

	this.authData.logoutUser().then((success)=>{
  		this.navCtrl.push(AccountPage);
  		this.storage.remove('userDetails');
  	}, (error)=>{
  		console.log('Error:', error);
  	});
  	

  }
}
