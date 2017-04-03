import { Component,NgZone } from '@angular/core';
import { NavController, NavParams, LoadingController,ToastController, ModalController, AlertController } from 'ionic-angular';
import {FetchProducts } from '../../providers/fetch-products.service';

import { Storage } from '@ionic/storage';
import {LastOrderPage} from '../last-order/last-order';
import {AddressPage} from '../address/address';
import {HomePage} from '../home/home';
import { App } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { CouponGet } from '../../providers/coupon-get';

@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
  providers:  [FetchProducts, CouponGet]
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
hasCoupon: boolean = false;

public newOrder: any = {};
public productsArray: Array<any> = [];
    public orderData = {};
    public products: Array<any> = [];
   productsFinal: Array<any> = [];
    public customerID: any;
    public shipping_address: any = {};
    public customerDescription: any = {};
    loading: any;
    orderDataID: any;
    emailVerified: boolean = false;
    couponChanged: boolean = false;
  
  
  couponDetails: any;
    
    orderPlaced: boolean = false;
    couponStatus: boolean = false;
    public couponValidationForm: FormGroup;
    //public couponValidationForm2: FormGroup;
    couponApplied: boolean = false;
    couponNotFound: boolean = false;
    couponError: boolean = false;
    submitAttemptCoupon: boolean = false;
    coupon2Applied: boolean = false;
    coupon2NotFound: boolean = false;
    coupon2Error: boolean = false;
    submitAttemptCoupon2: boolean = false;
    couponCode: any;
    couponType: any;
    couponDiscountType: any;
    couponAmount: any;

    differentAddressFlag: boolean = false;
    useDifferentAddress: boolean = false;
    couponCodeInvalid: boolean = false;
    subtotalBeforeCoupon: any = 0;
    totalAfterCoupon: any = 0;
    discountTotalMul: any = 0;
    couponAmountDisplay: any = 0;
    subtotalAmount: any = 0;

 constructor(public formBuilder:FormBuilder,public navCtrl:NavController,public nav:NavParams,public fetchProducts:FetchProducts, public storage:Storage,
   public loadingCtrl: LoadingController, public toastCtrl: ToastController, private app: App, public modalCtrl: ModalController, 
   public couponGet: CouponGet, public alertCtrl: AlertController) 
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
      this.couponValidationForm = formBuilder.group({
      coupon : ['', Validators.compose([Validators.required])],
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
      
    
      content: 'Add your address...'
      
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
          that.subtotalAmount = (element.count)*(element.price)
          that.products.push({product_id: element.id, quantity: element.count, subtotal: that.subtotalAmount});
        });
       }else if(!val){
         this.products = val;
       }
      

            });
      }

      couponChange(){
        console.log('tryingg....');
        this.submitAttemptCoupon = false;
        if(this.couponStatus){


          console.log("Coupon Validation page appearing....");
          this.hasCoupon = true;

          
        }else{
          this.hasCoupon = false;
          console.log("Coupon Validation page not appearing....");
        }
     
      }      
        elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
}

couponValidate(){

    this.submitAttemptCoupon = true;
     this.couponApplied = false;
    this.couponNotFound = false;
    this.couponError = false;
    if (!this.couponValidationForm.valid){
      console.log(this.couponValidationForm.value);
    } else {
      this.couponGet.useCoupon(this.couponValidationForm.value.coupon).subscribe((coupon) => {
        
        if(coupon.length == 1){
          console.log('Coupon is valid. Here it is: ', coupon);
          this.couponDetails = coupon[0];
          this.couponApplied = true;
          this.couponAmount = coupon[0].amount;
           this.couponAmountDisplay = Math.floor(Number(this.couponAmount));
          this.couponType = coupon[0].discount_type;
          if(this.couponType == 'percent'){
            this.couponDiscountType = '%';
          }
          
        }else{
          console.log('Coupon is not valid.');
          this.couponNotFound = true;
          
        }
      
        this.submitAttemptCoupon = false;
      }, (error) => {
        this.couponError = true;

        this.submitAttemptCoupon = false;
      });
    }
  }
couponValidate2(){

    this.submitAttemptCoupon2 = true;
     this.coupon2Applied = false;
    this.coupon2NotFound = false;
    this.coupon2Error = false;

    console.log("code is:", this.couponCode);
    console.log("length is:", this.couponCode.length);
    if (this.couponCode.length == 0){
      //console.log(this.couponValidationForm.value);
      this.couponCodeInvalid = true;
    } else {
      this.couponGet.useCoupon(this.couponCode).subscribe((coupon) => {
        
        if(coupon.length == 1){
          console.log('Coupon is valid. Here it is: ', coupon);
          this.couponDetails = coupon[0];
          this.couponApplied = true;
          this.couponAmount = coupon[0].amount;
          this.couponAmountDisplay = Number(coupon[0].amount);
          this.couponType = coupon[0].discount_type;
          if(this.couponType == 'percent'){
            this.couponDiscountType = '%';
          }
          
        }else{
          console.log('Coupon is not valid.');
          this.couponNotFound = true;
          
        }
      
        this.submitAttemptCoupon = false;
      }, (error) => {
        this.couponError = true;

        this.submitAttemptCoupon = false;
      });
    }
  }
  changeAddress(){

        
        if(this.differentAddressFlag){


          console.log("Using Different Address");
          this.useDifferentAddress = true;

          
        }else{
          this.useDifferentAddress = false;
          console.log("Using the Same Address");
        }
     


  }
      placeOrderDefault(){
        var that = this;
        if(this.products){
          this.orderPlaced = true;

          //if(this.discountcouponapplied)
          if(this.couponApplied){
            this.subtotalBeforeCoupon = 0;
            this.totalAfterCoupon = 0;
            this.discountTotalMul = ((100 - Number(that.couponAmount))/100);
            
            this.products.forEach(function(element, index){
             that.subtotalBeforeCoupon = element.subtotal;
             that.totalAfterCoupon = that.discountTotalMul * that.subtotalBeforeCoupon;
          that.productsFinal.push({product_id: element.product_id, quantity: element.quantity, subtotal: element.subtotal, total: that.totalAfterCoupon});
        });

            console.log("Path to coupon applied");
            console.log('that.productsFinal ', that.productsFinal);
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
      "line_items": this.productsFinal,
      "coupon_lines":
    [
        {
            'code': this.couponDetails.code,
            'id': this.couponDetails.id 
        }
    ]
    }

          }else{
            console.log("Path to coupon not applied");
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
     /* "coupon_lines":
    [
        [
            'code'=>'wer',
            'id'=>128,
            'amount'=>'10.00',
            'discount'=>'10'
        ]
    ]*/
    }
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
        message: 'Cart is empty',
        duration: 2000,
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
        if(this.orderForm.valid){

           this.submitAttempt=true;
      console.log("signUp function");
console.log("newUser: ", this.orderForm);

    if(this.products){
      this.orderPlaced = true;
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
        message: 'Cart is empty',
        duration: 3000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        this.navCtrl.setRoot(HomePage); 
      });

      toast.present(toast);
  }
   
        }else{
          let toast = this.toastCtrl.create({
        message: 'Please fill up all the fields!',
        duration: 2000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        
      });

      toast.present(toast);


        }
           

  }
 
 successOrder(){

    this.loading = this.loadingCtrl.create({
      
      content: 'Your order is being placed...'
    });

    this.loading.present();

    setTimeout(() => {
     this.navCtrl.push(LastOrderPage, {
       response: this.orderDataID
     });
    }, 500);

    setTimeout(() => {
      this.loading.dismiss();
    }, 1000);

  }

  cancel(){
   
     this.navCtrl.popToRoot();
    
  }

}
