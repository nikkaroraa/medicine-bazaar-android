import { Component,NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController } from 'ionic-angular';
import {FetchProducts } from '../../providers/fetch-products.service';
import firebase from 'firebase';
import { Storage } from '@ionic/storage';
import {LastOrderPage} from '../last-order/last-order';
import {AddressPage} from '../address/address';
import {HomePage} from '../home/home';
import {SearchPage} from '../search/search';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
public orderForm: FormGroup;
submitAttempt: boolean = false;

public newOrder: any = {};
public productsArray: Array<any> = [];
    public orderData = {};
    public products: Array<any> = [];
    public customerID: any;
    public shipping_address: any = {};
    public customerDescription: any = {};
    loading: any;
    orderDataID: any;
    emailVerified: boolean = false;
 constructor(public formBuilder:FormBuilder,public navCtrl:NavController,public nav:NavParams,public fetchProducts:FetchProducts, public storage:Storage,
   public loadingCtrl: LoadingController, public toastCtrl: ToastController) 
    {
      this.orderForm=this.formBuilder.group({
          sFirstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          sLastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          sAddress1:['', Validators.compose([Validators.maxLength(70),  Validators.required])],
          sAddress2:['', Validators.compose([Validators.maxLength(70)])],
          sPinCode:['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9 ]*'), Validators.required])],
          sCountry:['India',],
          sState:['Delhi',],
          sCity:['New Delhi',]
          
}); 
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

       if(snapshot.val().billing && snapshot.val().shipping && snapshot.val().customerDescription){
          that.userDetails = snapshot.val();
        console.log("this.userDetails", that.userDetails);
        that.userBilling = that.userDetails.billing;
        console.log("this.userBilling", that.userBilling);
        that.userShipping = that.userDetails.shipping;
        console.log("that.userShipping", that.userShipping);
        that.customerDescription = that.userDetails.customerDescription;
        }
       else {
          that.loading = that.loadingCtrl.create({
      spinner: 'hide',
    
      content: 'You need to fill up the address at first!'
      
    });
    
    that.loading.present();

    setTimeout(() => {
      that.loading.dismiss();
     that.navCtrl.push(AddressPage);
    }, 2000);
        }
        
      });
  
});

this.storage.get('cartProducts').then((val)=> {
        
       console.log('On the test-page: ', val);
       
       if(val){

          this.productsArray = val;
         var that = this;
         this.productsArray.forEach(function(element, index){
          
          that.products.push({product_id: element.id, quantity: element.count});
        });
       }else if(!val){
         this.products = val;
       }
      

            });
      }
      
        elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
}


      placeOrderDefault(){

        if(this.products){
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
        this.orderDataID = data.id;
        console.log(this.orderDataID);
        //this.storage.set('customerID', this.customerData.id); //customerId set here
        //this.createUserSuccessfull();
        this.storage.remove('cartProducts');
        this.storage.remove('productCount');
        this.storage.remove('cartInitialised');
        this.successOrder();
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }else{
     let toast = this.toastCtrl.create({
        message: 'There are no products in the cart!',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(HomePage); 
      });

      toast.present(toast);

  }
        
      }
      placeOrder(){
            this.submitAttempt=true;
      console.log("signUp function");
console.log("newUser: ", this.orderForm);

    if(this.products){
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
       "first_name": this.orderForm.value.sFirstName,
    "last_name": this.orderForm.value.sLastName,
    "company": "",
    "address_1": this.orderForm.value.sAddress1,
    "address_2": this.orderForm.value.sAddress2,
    "city": this.orderForm.value.sCity,
    "state": this.orderForm.value.sState,
    "postcode": this.orderForm.value.sPinCode,
    "country": this.orderForm.value.sCountry
      },
      "customer_id": this.customerDescription.customerID,
      "line_items": this.products

    }
    this.fetchProducts.placeOrder(this.newOrder).subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.orderData = data;
        console.log(this.orderData);
        this.orderDataID = data.id;
        console.log(this.orderDataID);
        //this.storage.set('customerID', this.customerData.id); //customerId set here
        //this.createUserSuccessfull();
        this.storage.remove('cartProducts');
        this.storage.remove('productCount');
        this.storage.remove('cartInitialised');
        this.successOrder();
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }else{
    let toast = this.toastCtrl.create({
        message: 'There are no products in the cart!',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(HomePage); 
      });

      toast.present(toast);
  }
   

  }
 
 successOrder(){

    this.loading = this.loadingCtrl.create({
      
      content: 'Congratulations!!! Your order has been placed with Medicine Bazaar'
    });

    this.loading.present();

    setTimeout(() => {
     this.navCtrl.push(LastOrderPage, {
       response: this.orderDataID
     });
    }, 1000);

    setTimeout(() => {
      this.loading.dismiss();
    }, 5000);

  }

  cancel(){
    this.navCtrl.setRoot(HomePage);
  }
}
