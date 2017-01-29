import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
/*
  Generated class for the LoginTest page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login-test',
  templateUrl: 'login-test.html'
})
export class LoginTestPage {

public userDetails: any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage) {

  	 this.storage.get('userDetails').then((val) => {
       console.log('userDetails are: ', val);
       this.userDetails = val;
       console.log("User Details again: ", this.userDetails);
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginTestPage');
  }

}
