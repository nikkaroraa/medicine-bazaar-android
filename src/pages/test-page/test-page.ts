import { Component } from '@angular/core';


import 'rxjs/Rx';

import { Xyz } from '../../providers/xyz';
import {FetchProducts } from '../../providers/fetch-products.service';

import { SendSms } from '../../providers/send-sms';

import {AlertController} from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
    public newOrder = {};
    public billing_address = {};
    public productsArray: Array<any> = [];
    public orderData = {};
    public products: Array<any> = [];
  constructor(public xyz:Xyz,public fetchProducts:FetchProducts,public sendSms:SendSms,private alertCtrl: AlertController, public storage:Storage) {


    this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the test-page: ', val);
       

       this.productsArray = val;
         var that = this;
       this.productsArray.forEach(function(element, index){
          
          that.products.push({product_id: element.id, quantity: element.count});
        });

        //this.cartArray = val;
        

/*this.cartItems = this.cartArray;
console.log(this.cartItems);
this.cartItems.forEach(function(element, index){
     that.costSum += element.count*Number(element.price);
    that.costSumString = that.costSum.toFixed(2);
    console.log("Added: ", that.costSum);
  });*/
            });

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
  /*
  genSms()
  {
    this.sendSms.sendSMS().subscribe(data => {
        this.data = data;
        console.log(this.data);
      },
        err => {
        console.log(err);
        this.errorAlert(err);
    },
        () => {
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
 errorAlert(err)  {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: err,
    buttons: ['Dismiss']
  });
  alert.present();
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
        this.errorAlert(err);
    },
        () => {
        console.log('Completed');
        this.presentAlert();
    });
  }
*/
  placeOrder(billing){
    this.newOrder = {
      "payment_method": "COD",
      "payment_method_title": "Cash On Delivery",
      "set_paid": true,
      "billing": {
        "first_name": billing.first_name,
        "last_name": billing.last_name,
        "address_1": billing.address1,
        "address_2": billing.address2,
        "city": billing.city,
        "state": billing.state,
        "postcode": billing.postcode,
        "country": billing.country,
        "email": "dalipkumar703@gmail.com",
        "phone": "9818418721"
      },
      "shipping": {
                "first_name": billing.first_name,
        "last_name": billing.last_name,
        "address_1": billing.address1,
        "address_2": billing.address2,
        "city": billing.city,
        "state": billing.state,
        "postcode": billing.postcode,
        "country": billing.country
      },
      "customer_id": 2,
      "line_items": this.products

    }
    this.fetchProducts.placeOrder(this.newOrder).subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.orderData = data;
        console.log(this.orderData);
        //this.storage.set('customerID', this.customerData.id); //customerId set here
        //this.createUserSuccessfull();
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });

  }
/*  openBrowser(){
      let browser = new InAppBrowser('https://medicinebazaar.in/payumoney/index.php', '_blank')
      
  }
*/
}
