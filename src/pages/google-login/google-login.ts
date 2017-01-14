
import { Component } from '@angular/core';
 
import { NavController, AlertController, Platform } from 'ionic-angular';
 
import { FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import {GooglePlus} from 'ionic-native';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';
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
 constructor(public navCtrl: NavController, public af: AngularFire,
        public alertController : AlertController,
        private platform: Platform) {
   this.af.auth.subscribe(user => {
      if(user) {
        // user logged in
        this.user = user;
      }
      else {
        // user not logged in
        this.user = {};
      }
    });
 }
login() {
  this.af.auth.login({
    provider: AuthProviders.Google,
    method: AuthMethods.Redirect
  });
}
  googlePlusLogin()
  {
 
      this.af.auth.subscribe((data: FirebaseAuthState) => {
 
        this.af.auth.unsubscribe()
        console.log("in auth subscribe", data)
 
        this.platform.ready().then(() => {
           GooglePlus.login({
             'webClientId' : '420052832956-0u8p34ddgit5ti5epriapsef9vip7552.apps.googleusercontent.com' }) .then((userData) => {
 
                var provider = firebase.auth.GoogleAuthProvider.credential(userData.idToken);
 
                 firebase.auth().signInWithCredential(provider)
                  .then((success) => {
                    console.log("Firebase success: " + JSON.stringify(success));
                    this.displayAlert(success,"signInWithCredential successful")
                    this.userProfile = success;
 
                  })
                  .catch((error) => {
                    console.log("Firebase failure: " + JSON.stringify(error));
                        this.displayAlert(error,"signInWithCredential failed")
                  });
 
                 })
             .catch((error) => {
                    console.log("Firebase failure: " + JSON.stringify(error));
                        this.displayAlert(error,"signInWithCredential failed")
                  });
 
            })
       })
 
  }
 
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
 
    }
 
}

 
