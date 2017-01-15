
import { Component } from '@angular/core';
 
import { NavController, AlertController, LoadingController,Platform } from 'ionic-angular';
 

import {GooglePlus} from 'ionic-native';

import { CheckoutPage } from '../checkout/checkout';
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
    GooglePlus.login(['email']).then( (response) => {
      let googleCredential = firebase.auth.GoogleAuthProvider
        .credential(response.authResponse.accessToken);

    firebase.auth().signInWithCredential(googleCredential)
      .then((success) => {
        console.log("Firebase success: " + JSON.stringify(success));
        this.userProfile = success;
        console.log('Google plus successfully logged in');
        this.successLogin();
    })
    .catch((error) => {
    console.log("Firebase failure: " + JSON.stringify(error));
    this.failureLogin();
  });

    }).catch((error) => { console.log(error); this.failureLogin(); });
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

 
