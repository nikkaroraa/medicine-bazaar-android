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


/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',
  providers: [Xyz, FetchProducts,SendSms]
})

export class TestPagePage {
  
    public data:any;
    public customerOrder:any;
    public verify:any={};
    public verifyStatus:any;
    
 
  constructor(public xyz:Xyz,public fetchProducts:FetchProducts,public sendSms:SendSms) {
   // console.log("call get all orders ...");
    
     
    // Orders for a particular customer
    /*
    this.fetchProducts.getAllOrders().subscribe(data => {
        this.data = data;
        for(var i=0;i<this.data.length;i++)
        {
          if(this.data[i].customer_id==2)
          {
            console.log(this.data[i].id);
          }

        }
        console.log(this.data);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
   */
  }
  
  //send sms to user
  genSms()
  {
    this.sendSms.sendSMS().subscribe(data => {
        this.data = data;
        console.log(this.data);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }
  //verify sms to user
  verifyOTP(otp)
  {
    this.verify.countryCode="91";
    this.verify.mobileNumber="9818418721";
    this.verify.oneTimePassword=otp;
    this.sendSms.verifySms(this.verify).subscribe(verifyStatus => {
        this.verifyStatus = verifyStatus;
        console.log(this.verifyStatus);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }

  callPayment()
  {
      this.xyz.paymentGateway();
  }

  openBrowser(){
      
      let browser = new InAppBrowser('https://ionic.io', '_blank', 'location=no');
  }

}
