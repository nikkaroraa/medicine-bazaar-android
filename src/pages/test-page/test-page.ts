import { Component } from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import { Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import { Xyz } from '../../providers/xyz';
import {FetchProducts } from '../../providers/fetch-products.service';
import { SMS } from 'ionic-native';
import { SendSms } from '../../providers/send-sms';
import { FormBuilder, Validators } from '@angular/forms';
import {AlertController} from 'ionic-angular';
import {MailSend} from '../../providers/mail-send';

/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',
  providers: [Xyz, FetchProducts,SendSms,MailSend]
})

export class TestPagePage {
  

    public data:any;
    public customerOrder:any;
    public verify:any={};
    public verifyStatus:any;
    
 
  constructor(public mailSend:MailSend,public fetchProducts:FetchProducts,public sendSms:SendSms,private alertCtrl: AlertController) {
   // console.log("call get all orders ...");
    
    this.mailSend.mailSending().subscribe(data=>{
    this.data=data;
    console.log(this.data);

  },
  err=> {
    console.log(err);
    this.mailSentAlert();
  },
  () => {
    console.log('Completed');
  this.mailSentAlert();
    });

  }
//sms sended
 mailSentAlert()  {
  let alert = this.alertCtrl.create({
    title: 'OTP Send',
    subTitle: 'OTP send succesfully!',
    buttons: ['Dismiss']
  });
  alert.present();
}

//error while sending
 errorSentAlert()  {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Message not Sent',
    buttons: ['Dismiss']
  });
  alert.present();
} 
  callPayment()
  {
      
  }

  openBrowser(){
      let browser = new InAppBrowser('https://medicinebazaar.in/payumoney/index.php', '_blank')
      
  }

}
