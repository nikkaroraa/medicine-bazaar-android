import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import {NewFbLoginPage} from '../new-fb-login/new-fb-login';
/*
  Generated class for the NewFbLogout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-new-fb-logout',
  templateUrl: 'new-fb-logout.html'
})
export class NewFbLogoutPage{
user: any;
userReady: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewFbLogoutPage');
  }
    ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
    }, function(error){
      console.log(error);
    });
  }

  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(NewFbLoginPage);
    }, function(error){
      console.log(error);
});
  }
}

