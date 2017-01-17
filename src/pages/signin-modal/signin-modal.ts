import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthData } from '../../providers/auth-data';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';


/*
  Generated class for the SigninModal page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signin-modal',
  templateUrl: 'signin-modal.html'
})
export class SigninModalPage {
public loginForm;
submitAttempt: boolean = false;
public userDetails: any = {};
 loading: any;
  userProfile: any = null;
  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public storage: Storage, public viewCtrl: ViewController) {

  	this.loginForm = formBuilder.group({
              email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
              password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SigninModalPage');
  }
  elementChanged(input){
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
  }
   loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        //this.nav.setRoot(HomePage);
        this.userDetails = {email: this.loginForm.value.email, password:this.loginForm.value.password};
          
          this.storage.set('userDetails',this.userDetails);
          console.log("this.userDetails", this.userDetails);
        this.successLogin();
      }, error => {
        this.failureLogin();
      });

  
    }
  }

  successLogin(){
  	let data = { 'foo': 'bar' };
   this.viewCtrl.dismiss(data);
    
  

  }

  failureLogin(){



   let alert = this.alertCtrl.create({
      title: 'Login Unsuccessfull!',
      subTitle: 'Login Unsuccessfull! Please check your username and password.',
      buttons: ['OK']
    });
    alert.present();

  

  }
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
          this.successLogin();
    })
    .catch((error) => {
    console.log("Firebase failure: " + JSON.stringify(error));
  });

    }).catch((error) => { console.log(error) });
  }

}
