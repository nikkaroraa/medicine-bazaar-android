import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SendSms } from '../../providers/send-sms';

/*
  Generated class for the OtpVerify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-otp-verify',
  templateUrl: 'otp-verify.html',
  providers: [SendSms]
})
export class OtpVerifyPage {
public otpVerification: FormGroup;
public verify:any={};
public verifyStatus:any;
public phoneVerified:boolean=false; 

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder:FormBuilder, 
  	public sendSms:SendSms,public alertCtrl:AlertController,) {
  	this.otpVerification=this.formBuilder.group({
botp:['', Validators.required],
          
}); 
  	console.log('UserId', navParams.get('mobile'));
  	this.verify.mobileNumber = navParams.get('mobile');
  	console.log("Verify.mobileNumber = ", this.verify.mobileNumber);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpVerifyPage');
  }

 verifyOTP()
  {
    this.verify.countryCode="91";
    this.verify.oneTimePassword=this.otpVerification.value.botp;
    this.sendSms.verifySms(this.verify).subscribe(verifyStatus => {
        this.verifyStatus = verifyStatus;
        console.log(this.verifyStatus);
        this.navCtrl.pop();
        
      },
        err => {
        console.log(err);
        this.errorAlert();
    },
        () => {
        console.log('Completed');
        this.phoneVerified = true;
        this.presentAlert();
    });
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
}
