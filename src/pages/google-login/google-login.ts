import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { GooglePlus, NativeStorage } from 'ionic-native';
/*
  Generated class for the GoogleLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-google-login',
  templateUrl: 'google-login.html'
})
export class GoogleLoginPage {

 constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {}

  doGoogleLogin(){
    let nav = this.navCtrl;
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    GooglePlus.login({
      'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '808169637831-667uavu6j7s5edp3c9p0f9bb3til0rgq.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true
    })
    .then(function (user) {
      loading.dismiss();

      NativeStorage.setItem('user', {
        name: user.displayName,
        email: user.email,
        picture: user.imageUrl
      })
      .then(function(){
        nav.push(UserPage);
      }, function (error) {
        console.log(error);
      })
    }, function (error) {
      loading.dismiss();
});
  }
}