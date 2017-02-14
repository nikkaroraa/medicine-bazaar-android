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
  nZone: NgZone;
  userUID:any;
  userProfilium: any;
  userBilling: any;
  FBUserBilling: any;
  FBUserDetails: any;
  customerContact: any;
  userProfiler: any;
  FBCustomerContact: any;
  userProfilingID: any;
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
   var that = this;   
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        
        this.userDetails = {email: this.loginForm.value.email, password:this.loginForm.value.password};
          this.storage.set('userDetails',this.userDetails);
          console.log("this.userDetails Login", this.userDetails);

             that.user = firebase.auth().currentUser;
           that.userUID = that.user.uid;
          
     
    that.userProfilium = firebase.database().ref('userProfile/' + that.userUID);
          that.userProfilium.on('value', function(snapshot) {
     
        console.log("Snapshot Login",snapshot.val());
        
        if(snapshot.val().billing && snapshot.val().shipping && snapshot.val().customerDescription){
          //user has been created in the WooCommerce
           that.userDetails = snapshot.val();
        console.log("this.userDetails", that.userDetails);
        that.userBilling = that.userDetails.billing;
        console.log("this.userBilling", that.userBilling);
        that.customerContact = {customerContact: that.userBilling.phone, customerEmail: that.userBilling.email};
          that.storage.set('customerContact',that.customerContact);
          console.log('Customer Contact: ', that.customerContact);
        }else{
          //User has not been created in the WooCommerce and hence no contact details.
           let toast = this.toastCtrl.create({
        message: 'You need to fill up the details!',
        duration: 2000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(AddressPage); 
      });

      toast.present(toast);
        }
});
        this.successLogin();
      }, error => {
        console.log("ERROR: ", error);
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
         that.zone.run( () => {
        

          console.log("Firebase success: " + JSON.stringify(success));
         // alert("Success: "+ success);
        this.userProfile = success;
         this.userFB = firebase.auth().currentUser;
          this.userFBUID = this.userFB.uid;
         // alert('fbuserid: ' + this.userFBUID);
       this.userProfiler = firebase.database().ref('userProfile');
      // alert('userProfiling: ' + that.userProfiler);
        that.userProfiler.on('value', function(snapshot) {
          
          //  alert('wooo');
        console.log("Snapshot",snapshot.val());
        let exists = snapshot.child(that.userFBUID).exists();
       // alert("exists:" + exists);
        if(exists){
          //login for the second time or above   
//alert('beforeeee');
            let billingExists = snapshot.child(that.userFBUID).val().billing;
           if(billingExists){
        //    alert("billing exists");
          //user has been created in the WooCommerce
        //  alert('that.userFBUID: '+ that.userFB.uid);
           that.FBUserDetails = snapshot.child(that.userFBUID).val();
        console.log("this.FBUserDetails", that.FBUserDetails);
      //  alert('goin');
        that.FBUserBilling = that.FBUserDetails.billing;
        console.log("this.FBUserBilling", that.FBUserBilling);
      //  alert('going');
      //  alert("PHONE" + that.FBUserBilling.phone);
      //  alert("customerEmail" + that.FBUserBilling.email);
        that.FBCustomerContact = {customerContact: that.FBUserBilling.phone, customerEmail: that.FBUserBilling.email};
          that.storage.set('customerContact',that.FBCustomerContact);
          console.log('FB Customer Contact: ', that.FBCustomerContact);
      //  alert('gone'); 
      }else{
        //user has not been created in Woocommerce yet!
       // alert('billing does not exist');
      }
               
          
          
        
        }else{
           //login for the first time
         //  alert("1st time");
           that.userProfiling = firebase.database().ref('userProfile');
           that.userProfiling.child(that.userFBUID).set({fbLogin: true, email: that.userProfile.email}); 
           //  alert('done');
          
        }
         

      

});
         
       that.userDetails = {email: that.userProfile.email, password: that.userFBUID};
          that.storage.set('userDetails',that.userDetails);
          console.log("this.userDetails", that.userDetails);
        that.successLogin();
        
          
          
         }); 
    })
    .catch((error) => {
    //  alert("error: "+ error);
    console.log("Firebase failure: " + JSON.stringify(error));

  });

    }).catch((error) => { console.log(error);
    // alert(error);
      });
  }

   sendVerificationMail(){
    this.user.sendEmailVerification().then(function() {
      console.log("Email sent successfully");
    }, function(error) {
      console.log("Email sending failed");
    });

  }
  
}