import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import {FetchProducts} from '../../providers/fetch-products.service';
import { LastOrderPage} from '../last-order/last-order';
/*
  Generated class for the Address page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
  providers: [FetchProducts]
})
export class AddressPage {
billing_address: any = {};
shipping_address: any = {};
userDetails: any;
userSend: any = {};
customerData: any; 
  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public fetchProducts: FetchProducts) 
  {

  	
  	this.storage.get('userDetails').then((val)=>{
  		this.userDetails = val; 
  	});
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  switchBillingtoShipping(){
  	this.shipping_address =  this.billing_address;
  }



  

  createUser(billing_address, shipping_address){
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
        this.storage.set('customerID', this.customerData.id); //customerId set here
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
      this.navCtrl.push(LastOrderPage, {
      response: this.customerData.last_order
    });

    }
}
