import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FetchProducts} from '../../providers/fetch-products.service';
import { LastOrderPage} from '../last-order/last-order';
import firebase from 'firebase';
import { SendSms } from '../../providers/send-sms';
import {AlertController,  LoadingController} from 'ionic-angular';
/*
  Generated class for the Address page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
  providers: [FetchProducts, SendSms]
})
export class AddressPage {
billing_address: any = {};
shipping_address: any = {};
userDetails: any;
userSend: any = {};
customerData: any; 
userUID: any;
user: any;
userProfile: any;
public verify:any={};
public verifyStatus:any;
public phoneVerified:boolean=false;
public data:any;
public emailVerified: boolean = false;
loading: any;
public emailID: any;
zone: NgZone;
nZone: NgZone;
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage,
  public alertCtrl:AlertController, public fetchProducts: FetchProducts, public sendSms:SendSms, public loadingCtrl: LoadingController) 
  {
   this.zone = new NgZone({});
    var that = this;
      const firebaseConfig = {
      apiKey: "AIzaSyByyA3R_KJMD2LF9G95eu7qM5xGA7evMGc",
      authDomain: "medicinebazaarandroid.firebaseapp.com",
      databaseURL: "https://medicinebazaarandroid.firebaseio.com",
      storageBucket: "medicinebazaarandroid.appspot.com",
      messagingSenderId: "420052832956"
    };    
      firebase.app().delete().then(function() {
    that.zone.run( () => {
  firebase.initializeApp(firebaseConfig);
  console.log("Initialised again");
  

    firebase.auth().onAuthStateChanged(function(user) {
      
        if (user) {

          // User is signed in and currentUser will no longer return null.
           that.user = firebase.auth().currentUser;
          that.emailVerified = that.user.emailVerified;
          console.log("Email verified", that.emailVerified);
          if(!that.emailVerified){

      that.loading = that.loadingCtrl.create({
      spinner: 'hide',
    
      content: 'You need to verify your E-mail first. Check your inbox!'
      
    });
    
    that.loading.present();

    setTimeout(() => {
      that.loading.dismiss();
     that.navCtrl.pop();
    }, 1000);

    
    
    that.storage.get('userDetails').then((val)=>{
      that.userDetails = val; 
    });
  }

        } else {
          console.log("User doesn't exist");
          // No user is signed in.
        }
      
});
  
     
  });
});
    
        }
genSms(phone)
  {
    this.sendSms.sendSMS(phone).subscribe(data => {
        this.data = data;
        console.log(this.data);
      },
        err => {
        console.log(err);
        this.errorSmsSentAlert();
    },
        () => {
       this.sentSmsAlert();
    });
  }
//sms sended
 sentSmsAlert()  {
  let alert = this.alertCtrl.create({
    title: 'OTP Send',
    subTitle: 'OTP send succesfully!',
    buttons: ['Dismiss']
  });
  alert.present();
}

//error while sending
 errorSmsSentAlert()  {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Message not Sent',
    buttons: ['Dismiss']
  });
  alert.present();
} 


//successfully alert verify otp
 presentAlert()  {
  let alert = this.alertCtrl.create({
    title: 'OTP Verify',
    subTitle: 'Otp verified successfully!',
    buttons: ['Dismiss']
  });
  alert.present();
}

//error otp
 errorAlert()  {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'OTP is not verified!',
    buttons: ['Dismiss']
  });
  alert.present();
}
  

  //verify sms to user

  verifyOTP(otp,phone)
  {
    this.verify.countryCode="91";
    this.verify.mobileNumber=phone;
    this.verify.oneTimePassword=otp;
    this.sendSms.verifySms(this.verify).subscribe(verifyStatus => {
        this.verifyStatus = verifyStatus;
        console.log(this.verifyStatus);
        
      },
        err => {
        console.log(err);
        this.errorAlert();
    },
        () => {
        console.log('Completed');
        this.phoneVerified=true;
        this.presentAlert();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  switchBillingtoShipping(){
  	this.shipping_address =  this.billing_address;
  }



  

  createUser(billing_address, shipping_address){
  	 this.billing_address = billing_address;
     this.shipping_address = shipping_address;
     	this.userSend = {
  "email": this.userDetails.email,
  "password": this.userDetails.password,
  "first_name": billing_address.first_name,
  "last_name": billing_address.last_name,
  "username": "",
  "billing": {
    "first_name": billing_address.first_name,
    "last_name": billing_address.last_name,
    "company": "",
    "address_1": billing_address.address1,
    "address_2": billing_address.address2,
    "city": billing_address.city,
    "state": billing_address.state,
    "postcode": billing_address.postcode,
    "country": billing_address.country,
    "email": this.userDetails.email,
    "phone": billing_address.phone
  },
  "shipping": {
    "first_name": shipping_address.first_name,
    "last_name": shipping_address.last_name,
    "company": "",
    "address_1": shipping_address.address1,
    "address_2": shipping_address.address2,
    "city": shipping_address.city,
    "state": shipping_address.state,
    "postcode": shipping_address.postcode,
    "country": shipping_address.country
  }
}
 console.log("call create User ...");
      this.fetchProducts.createUser(this.userSend).subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.customerData = data;
        console.log(this.customerData);
        this.storage.set('customerID', this.customerData.id);
         //customerId set here
       this.saveToFirebase();
        this.createUserSuccessfull();
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }
  createUserSuccessfull(){
      console.log("Inside createUserSuccessfull", this.customerData.last_order);
      

    }

    saveToFirebase(){

    	this.user = firebase.auth().currentUser;
    	this.userUID = this.user.uid;
      this.emailID = this.user.email;
      console.log(this.emailID);
      this.userProfile = firebase.database().ref('/userProfile');

       this.userProfile.child(this.userUID).set({customerID: this.customerData.id , billing: this.billing_address, shipping: this.shipping_address});
        console.log("Successfully stored inside the Firebase");
    }

}
