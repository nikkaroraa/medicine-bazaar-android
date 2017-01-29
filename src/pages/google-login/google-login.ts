
import { Component } from '@angular/core';
 
import { NavController, AlertController, LoadingController,Platform } from 'ionic-angular';
 

import {GooglePlus} from 'ionic-native';

import { CheckoutPage } from '../checkout/checkout';
import {ListPage} from '../list/list';
import firebase from 'firebase';

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
userProfile: any = null;
user = {};
  loading: any;

 constructor(public navCtrl: NavController, public alertCtrl : AlertController, private platform: Platform, public loadingCtrl: LoadingController) {
   /*this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
      }
      else {
        // user not logged in
        this.user = {};
      }
    });*/
 }
 /*
login() {
  this.af.auth.login({
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
  });
}*/
  googleLogin(){
    
      
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '808169637831-667uavu6j7s5edp3c9p0f9bb3til0rgq.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  })
  .then(function (user) {
    this.navCtrl.push(CheckoutPage);

    
  }, function (error) {
    this.navCtrl.push(ListPage);
  });

    
     
  
  }

  successLogin(){

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Login Successfull! Please Wait...'
    });

    this.loading.present();

    setTimeout(() => {
     this.navCtrl.push(CheckoutPage);
    }, 1000);

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);

  }

  failureLogin(){



   let alert = this.alertCtrl.create({
      title: 'Login Unsuccessfull!',
      subTitle: 'Login Unsuccessfull! Please check your username and password.',
      buttons: ['OK']
    });
    alert.present();

  

  }
 /*
  displayAlert(value,title)
  {
      let coolAlert = this.alertController.create({
      title: title,
      message: JSON.stringify(value),
      buttons: [
                    {
                        text: "Cancel"
                    },
                    {
                        text: "Save",
                        handler: data => {
                        }
                    }
               ]
      });
      coolAlert.present();
 
    }*/
 
}

 
