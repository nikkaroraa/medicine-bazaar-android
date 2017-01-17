import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FetchProducts } from '../../providers/fetch-products.service';
import {AlertController} from 'ionic-angular';
import { SendSms } from '../../providers/send-sms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
public checkoutForm: FormGroup;
submitAttempt: boolean = false;
 constructor(public formBuilder:FormBuilder,public NavCtrl:NavController,public Nav:NavParams, public fetchProducts:FetchProducts, public alertCtrl:AlertController, public sendSms:SendSms) 
    {
       this.checkoutForm=this.formBuilder.group({
          firstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          lastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          email:['', Validators.compose([Validators.maxLength(30), Validators.pattern('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/'), Validators.required])],
          password:['', Validators.compose([Validators.maxLength(10), Validators.pattern('^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\S+$).{8,}$'), Validators.required])],
          address1:['', Validators.compose([Validators.maxLength(70), Validators.pattern('^\d+\s[A-z]+\s[A-z]+'), Validators.required])],
          address2:['', Validators.compose([Validators.maxLength(70), Validators.pattern('^\d+\s[A-z]+\s[A-z]+')])],
          pincode:['', Validators.compose([Validators.maxLength(5), Validators.pattern('[0-9 ]*'), Validators.required])],
          phone:['', Validators.compose([Validators.maxLength(10), Validators.pattern('[0-9 ]*'), Validators.required])],
          username:['',Validators.compose([Validators.maxLength(10), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          state:['I',],
          city:['I',],
          otp:['',]
        }); 
    }
    //checkout validator
     elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }


    //send sms to user
  genSms(phone)
  {
    console.log("genSms method..",this.checkoutForm.value.phone);
    this.sendSms.sendSMS(this.checkoutForm.value.phone).subscribe(data => {
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
    this.verify.mobileNumber=this.checkoutForm.value.phone;
    this.verify.oneTimePassword=this.checkoutForm.value.otp;
    console.log(this.verify);
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

    
 signUp()
  {
      this.submitAttempt=true;
      console.log("signUp function");
      console.log("newUser: ", this.checkoutForm);
 

      this.userSend = {

        "email": this.checkoutForm.value.email,
        "password": this.checkoutForm.value.password,
        "first_name":this.checkoutForm.value.firstName,
        "last_name": this.checkoutForm.value.lastName,
        "username": this.checkoutForm.value.userName,
        
        "billing": {
          "first_name": this.checkoutForm.value.firstName,
          "last_name": this.checkoutForm.value.lastName,
          "company": "genIThub",
          "address_1": this.checkoutForm.value.address1,
          "address_2": this.checkoutForm.value.address2,
          "city": this.checkoutForm.value.city,
          "state": this.checkoutForm.value.state,
          "postcode": this.checkoutForm.value.pincode,
          //"country": this.checkoutForm.value.country,
          "email": this.checkoutForm.value.email,
          "phone": this.checkoutForm.value.phone
        },
        "shipping": {
          "first_name": this.checkoutForm.value.firstName,
          "last_name":this.checkoutForm.value.lastName,
          "company": "genIThub",
          "address_1":this.checkoutForm.value.address1,
          "address_2": this.checkoutForm.value.address2,
          "city": this.checkoutForm.value.city,
          "state": this.checkoutForm.value.state,
          "postcode": this.checkoutForm.value.pincode,
          "country": this.checkoutForm.value.country
        
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
