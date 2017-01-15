import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FetchProducts } from '../../providers/fetch-products.service';
/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers: [FetchProducts]
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
 constructor(public NavCtrl:NavController,public Nav:NavParams, public fetchProducts:FetchProducts) 
    {
        
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
