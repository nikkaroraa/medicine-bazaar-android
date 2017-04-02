import { Component,NgZone } from '@angular/core';
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
  zone: NgZone;
  public userFB: any;
  public userFBUID: any;
  public userProfiling: any;
  fbLoggingIn: boolean =false;
  userEmail: any;
  FBMobile: boolean = false;
  userProfiler: any;
  FBUserBilling: any;
FBUserDetails: any;

FBCustomerContact: any;
databaseExists: boolean = false;
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
     console.log('returned');
    Facebook.login(['email']).then( (response) => {
      
      this.zone = new NgZone({});
      this.fbLoggingIn = true;
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
          

         // alert("this.userEmail "+ this.userFB.email);
setTimeout(() => {
          }, 200);
          if(!this.userFB.email){
            
           // alert('userEmail doesn\'t exist');

            this.userEmail = this.userFBUID + '@gmail.com';
            // alert('Now this.userEmail is '+ this.userEmail);
            this.FBMobile = true;
            setTimeout(() => {
            }, 300);
          }
          //alert('fbuserid: ' + this.userFBUID);
          
          setTimeout(() => {
          }, 300);
       this.userProfiler = firebase.database().ref('userProfile');
       //alert('userProfiling: ' + that.userProfiler);
        that.userProfiler.on('value', function(snapshot) {
          
         //   alert('wooo');
        console.log("Snapshot",snapshot.val());
        let exists = snapshot.child(that.userFBUID).exists();
        //alert("exists:" + exists);
        if(exists){
          //login for the second time or above   
//alert('beforeeee');
            let billingExists = snapshot.child(that.userFBUID).val().billing;
           if(billingExists){
         // alert("billing exists");
          //user has been created in the WooCommerce
         // alert('that.userFBUID: '+ that.userFB.uid);
           that.FBUserDetails = snapshot.child(that.userFBUID).val();
        console.log("this.FBUserDetails", that.FBUserDetails);
       // alert('goin');
        that.FBUserBilling = that.FBUserDetails.billing;
        console.log("this.FBUserBilling", that.FBUserBilling);
       // alert('going');
        //alert("PHONE" + that.FBUserBilling.phone);
        //alert("customerEmail" + that.FBUserBilling.email);
        that.FBCustomerContact = {customerContact: that.FBUserBilling.phone, customerEmail: that.FBUserBilling.email};
          that.storage.set('customerContact',that.FBCustomerContact);
          //alert('customerContact' + that.FBCustomerContact);
          console.log('FB Customer Contact: ', that.FBCustomerContact);
           that.databaseExists = true;
      //  alert('gone'); 
      }else{
        //user has not been created in Woocommerce yet!
       // alert('billing does not exist');
      }
               
          
          
        
        }else{
           //login for the first time
         //  alert("1st time");
           that.userProfiling = firebase.database().ref('userProfile');

           if(that.FBMobile){
             that.userProfiling.child(that.userFBUID).set({fbLogin: true, email: that.userEmail});
           }else{that.userProfiling.child(that.userFBUID).set({fbLogin: true, email: that.userProfile.email}); 
           //  alert('done');
           }
        }
         

      

});
         
         if(that.FBMobile){
           that.userDetails = {email: that.userEmail, password: that.userFBUID};
         }else{
            that.userDetails = {email: that.userProfile.email, password: that.userFBUID};
            
         }
       that.storage.set('userDetails',that.userDetails);
          console.log("this.userDetails", that.userDetails); 
        
        that.successLogin();
        
          
          
         }); 
    })
    .catch((error) => {
    //  alert("error: "+ error);
    console.log("Firebase failure: " + JSON.stringify(error));
     let alert = this.alertCtrl.create({
      title: 'Login Unsuccessfull!',
      subTitle: 'Login Unsuccessfull! Please try again.',
      buttons: ['OK']
    });
    alert.present();
  });

    }).catch((error) => { console.log(error);
    // alert(error);
      });
  }

}
