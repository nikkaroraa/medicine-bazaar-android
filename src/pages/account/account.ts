import { Component,NgZone } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { EmailValidator } from '../../validators/email';
import { CheckoutPage } from '../checkout/checkout';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { Facebook } from 'ionic-native';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import {AddressPage} from '../address/address';
/*
  Generated class for the Account page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  public signupForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;
  userProfile: any = null;
  public loginForm;
  user: any;
  Account: string = "login";    
  public userDetails: any = {};
  public userFB: any;
  public userFBUID: any;
  public userProfiling: any;
  zone: NgZone;
  constructor(public nav: NavController, public authData: AuthData, public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController, public alertCtrl: AlertController, public storage: Storage) {
        this.signupForm = formBuilder.group({
              email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
              password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        })

        this.loginForm = formBuilder.group({
              email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
              password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
        });
    } 
    
  ionViewDidLoad() {
    console.log('ionViewDidLoad AccountPage');
  }
  elementChanged(input){
        let field = input.inputControl.name;
        this[field + "Changed"] = true;
  }

  /**
   * If the form is valid it will call the AuthData service to sign the user up password displaying a loading
   *  component while the user waits.
   *
   * If the form is invalid it will just log the form value, feel free to handle that as you like.
   */
  signupUser(){
    this.submitAttempt = true;

    if (!this.signupForm.valid){
      console.log(this.signupForm.value);
    } 
    else 
    {
      this.authData.signupUser(this.signupForm.value.email, this.signupForm.value.password).then(() => {
        //this.nav.setRoot(HomePage);
          console.log("Successfully Signed Up");
          this.successSignUp();
          this.userDetails = {email: this.signupForm.value.email, password:this.signupForm.value.password};
          this.storage.set('userDetails',this.userDetails);
          console.log("this.userDetails", this.userDetails);

          if(firebase.auth().currentUser){
            this.user = firebase.auth().currentUser;
           }
          else{
            this.user = {};
           }
          this.sendVerificationMail();
           //verification mail sent
          /*this.storage.get('userDetails').then((val)=>{

            console.log("User Details are: ", val);
          });*/
      }, (error) => {
        this.failureSignUp();
      });

      /*this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
        console.log("I dont know exactly");
      this.loading.present();

*/

  
  
    }
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

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Login Successfull! Please Wait...'
    });

    this.loading.present();

    setTimeout(() => {
     this.nav.push(AddressPage);
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

  successSignUp(){

    this.loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'SignUp Successfull! Please Wait...'
    });

    this.loading.present();

    setTimeout(() => {
     this.nav.push(AddressPage);
    }, 1000);

    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);

  }

  failureSignUp(){



   let alert = this.alertCtrl.create({
      title: 'Sign Up Unsuccessfull!',
      subTitle: 'Please try again with different credentials...',
      buttons: ['OK']
    });
    alert.present();

  

  }

   goToSignup(){

     this.Account = "signUp";
     console.log("Account changed to signUp");
   }   

   goToResetPassword(){

     this.nav.push(ResetPasswordPage);
   }

   facebookLogin(){
    Facebook.login(['email']).then( (response) => {
      
      this.zone = new NgZone({});
      var that = this;
      let facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

    firebase.auth().signInWithCredential(facebookCredential)
      .then((success) => {
        

          console.log("Firebase success: " + JSON.stringify(success));

        this.userProfile = success;
         this.userFB = firebase.auth().currentUser;
          this.userFBUID = this.userFB.uid;

          if(this.userFB){
               //login for the second time or above      
               this.userProfiling = firebase.database().ref('userProfile' + this.userFBUID);

          }
          else if(!this.userFB){
            //login for the first time
            this.userProfiling = firebase.database().ref('userProfile');
             this.userProfiling.child(this.userFBUID).set({fbLogin: true, email: this.userProfile.email});        
          }
    
     
          this.userDetails = {email: this.userProfile.email, password: this.userFBUID};
          this.storage.set('userDetails',this.userDetails);
          console.log("this.userDetails", this.userDetails);
        this.successLogin();
       
        
          
          
          
    })
    .catch((error) => {
    console.log("Firebase failure: " + JSON.stringify(error));
  });

    }).catch((error) => { console.log(error) });
  }

   sendVerificationMail(){
    this.user.sendEmailVerification().then(function() {
      console.log("Email sent successfully");
    }, function(error) {
      console.log("Email sending failed");
    });

  }
  
}