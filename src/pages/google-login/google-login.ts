import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable, FirebaseAuthState } from 'angularfire2';
import {GooglePlus} from 'ionic-native';
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
 constructor(public navCtrl: NavController, public loadingCtrl: LoadingController,public af: AngularFire
   ,private platform: Platform,public alertController : AlertController) {}

 /* doGoogleLogin(){
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
*/
  googlePlusLogin()
  {
 
      this.af.auth.subscribe((data: FirebaseAuthState) => {
 
        //this.af.auth.unsubscribe();
        console.log("in auth subscribe", data);
 
        this.platform.ready().then(() => {
           GooglePlus.login({
             'webClientId' : '808169637831-667uavu6j7s5edp3c9p0f9bb3til0rgq.apps.googleusercontent.com' }) .then((userData) => {
 
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



