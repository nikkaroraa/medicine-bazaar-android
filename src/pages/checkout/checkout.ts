import { Component,NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {FetchProducts } from '../../providers/fetch-products.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import {HomePage} from '../home/home';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers:  [FetchProducts]
})
export class CheckoutPage {
    
public user: any;
public userProfile: any;
public userUID: any;
public userDetails: any = {};
public userBilling: any = {};
public userShipping: any = {};
zone: NgZone;
public newOrder: any = {};
public productsArray: Array<any> = [];
    public orderData = {};
    public products: Array<any> = [];
    public customerID: any;
    public shipping_address: any = {};
    public customerDescription: any = {};
    loading: any;
 constructor(public navCtrl:NavController,public nav:NavParams,public fetchProducts:FetchProducts, public storage:Storage,
   public loadingCtrl: LoadingController) 
    {
      this.zone = new NgZone({});
  this.user = firebase.auth().currentUser;
  this.userUID = this.user.uid;
  var that = this;
   //this.userProfile = firebase.database().ref('/userProfile/'+this.userUID+'/billing/address1');
  console.log("this.userUID", this.userUID);
   this.userProfile = firebase.database().ref('userProfile/' + this.userUID);
    this.userProfile.on('value', function(snapshot) {
      that.zone.run( () => {
        console.log("Snapshot",snapshot.val());
  that.userDetails = snapshot.val();
  console.log("this.userDetails", that.userDetails);
  that.userBilling = that.userDetails.billing;
  console.log("this.userBilling", that.userBilling);
  that.userShipping = that.userDetails.shipping;
  console.log("that.userShipping", that.userShipping);
  that.customerDescription = that.userDetails.customerDescription;
      });
  
});

this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the test-page: ', val);
       

       this.productsArray = val;
         var that = this;
       this.productsArray.forEach(function(element, index){
          
          that.products.push({product_id: element.id, quantity: element.count});
        });

            });
      }

      placeOrderDefault(){

        this.newOrder = {
      "payment_method": "COD",
      "payment_method_title": "Cash On Delivery",
      "set_paid": true,
      "billing": {
        "first_name": this.userBilling.first_name,
        "last_name": this.userBilling.last_name,
        "address_1": this.userBilling.address1,
        "address_2": this.userBilling.address2,
        "city": this.userBilling.city,
        "state": this.userBilling.state,
        "postcode": this.userBilling.postcode,
        "country": this.userBilling.country,
        "email": this.customerDescription.email,
        "phone": this.userBilling.phone
      },
      "shipping": {
        "first_name": this.userShipping.first_name,
        "last_name": this.userShipping.last_name,
        "address_1": this.userShipping.address1,
        "address_2": this.userShipping.address2,
        "city": this.userShipping.city,
        "state": this.userShipping.state,
        "postcode": this.userShipping.postcode,
        "country": this.userShipping.country
      },
      "customer_id": this.customerDescription.customerID,
      "line_items": this.products
    }
    this.fetchProducts.placeOrder(this.newOrder).subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.orderData = data;
        console.log(this.orderData);
        //this.storage.set('customerID', this.customerData.id); //customerId set here
        //this.createUserSuccessfull();
        this.storage.remove('cartProducts');
        this.storage.remove('productCount');
        this.successOrder();
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
      }
      placeOrder(shipping){
    this.newOrder = {
      "payment_method": "COD",
      "payment_method_title": "Cash On Delivery",
      "set_paid": true,
      "billing": {
        "first_name": this.userBilling.first_name,
        "last_name": this.userBilling.last_name,
        "address_1": this.userBilling.address1,
        "address_2": this.userBilling.address2,
        "city": this.userBilling.city,
        "state": this.userBilling.state,
        "postcode": this.userBilling.postcode,
        "country": this.userBilling.country,
        "email": this.customerDescription.email,
        "phone": this.userBilling.phone
      },
      "shipping": {
        "first_name": shipping.first_name,
        "last_name": shipping.last_name,
        "address_1": shipping.address1,
        "address_2": shipping.address2,
        "city": shipping.city,
        "state": shipping.state,
        "postcode": shipping.postcode,
        "country": shipping.country
      },
      "customer_id": this.customerDescription.customerID,
      "line_items": this.products

    }
    this.fetchProducts.placeOrder(this.newOrder).subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.orderData = data;
        console.log(this.orderData);
        //this.storage.set('customerID', this.customerData.id); //customerId set here
        //this.createUserSuccessfull();
        this.storage.remove('cartProducts');
        this.storage.remove('productCount');
        this.successOrder();
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });

  }
 
 successOrder(){

    this.loading = this.loadingCtrl.create({
      
      content: 'Congratulations!!! Your order has been placed with Medicine Bazaar'
    });

    this.loading.present();

    setTimeout(() => {
     this.navCtrl.setRoot(HomePage);
    }, 1000);

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);

  }
}
