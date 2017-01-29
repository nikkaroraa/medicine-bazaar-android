import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';

/*
  Generated class for the FbLogin page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fb-login',
  templateUrl: 'fb-login.html'
}) 
export class FbLoginPage {

public userDetails: any = {};
 userProfile: any = null;
  constructor(public navCtrl: NavController, public storage: Storage) {}

  facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      let facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

    firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
        console.log("Firebase success: " + JSON.stringify(success));
        this.userProfile = success;
        this.userDetails = {email: this.userProfile.email};
          this.storage.set('userDetails',this.userDetails);
          console.log("this.userDetails", this.userDetails);
    })
    .catch((error) => {
    console.log("Firebase failure: " + JSON.stringify(error));
  });

    }).catch((error) => { console.log(error) });
  }
}