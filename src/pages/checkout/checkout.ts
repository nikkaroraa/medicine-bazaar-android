import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FetchProducts } from '../../providers/fetch-products.service';
import {AlertController} from 'ionic-angular';
import { SendSms } from '../../providers/send-sms';
/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers: [FetchProducts, SendSms]
})
export class CheckoutPage {
    /*
  declare var window: any;
declare var cordova: any;
*/
public newUser:any={};
public billing_address:any={};
public userSend: any = {};
public customerData: any;
public data:any;
public verify:any={};
public verifyStatus:any;
public phoneVerified:boolean=false;
 constructor(public NavCtrl:NavController,public Nav:NavParams, public fetchProducts:FetchProducts, public alertCtrl:AlertController, public sendSms:SendSms) 
    {
        
    }
    //send sms to user
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

    
 signUp(newUser,billing_address)
  {
      console.log("signUp function");
      console.log("newUser: ", newUser);
      console.log("billing_address: ", billing_address);

      this.userSend = {

        "email": newUser.email,
        "password": newUser.password,
        "first_name": newUser.first_name,
        "last_name": newUser.last_name,
        "username": newUser.username,
        
        "billing": {
          "first_name": newUser.first_name,
          "last_name": newUser.last_name,
          "company": "genIThub",
          "address_1": billing_address.address1,
          "address_2": billing_address.address2,
          "city": billing_address.city,
          "state": billing_address.state,
          "postcode": billing_address.postcode,
          "country": billing_address.country,
          "email": newUser.email,
          "phone": billing_address.phone
        },
        "shipping": {
          "first_name": newUser.first_name,
          "last_name": newUser.last_name,
          "company": "genIThub",
          "address_1": billing_address.address1,
          "address_2": billing_address.address2,
          "city": billing_address.city,
          "state": billing_address.state,
          "postcode": billing_address.postcode,
          "country": billing_address.country
        
        }

      }
      console.log("call create User ...");
      this.fetchProducts.createUser(this.userSend).subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.customerData = data;
        console.log(this.customerData);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }   
 /*   
 static get parameters() {
        return [[Platform]];
    }
 
    constructor(platform) {
        this.platform = platform;
    }
 
    launch(url) {
        this.platform.ready().then(() => {
            cordova.InAppBrowser.open(url, "_system", "location=true");
        });
    }
    */
}
