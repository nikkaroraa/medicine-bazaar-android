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
import {SelectAddressPagePage} from '../select-address-page/select-address-page';
 
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
   couponExcludeProducts: Array<any> = []; 
      couponExcludeCategories: Array<any> = [];
    productCategoriesID: Array<any> = [];
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
    subtotalAmount: any = 0
    subTotalSum: any = 0;
    totalSum: any = 0;
    totalDiscountSum: any = 0;
    excludedProductsFound: boolean = false;
    excludedCategoriesFound: boolean = false;
    couponApplicable: boolean = false;
    couponRequestInitiated: boolean = false;
    couponRequestCompleted: boolean = false;
    orderShippingAddress: any = {};

 constructor(public formBuilder:FormBuilder,public navCtrl:NavController,public navParams:NavParams,public fetchProducts:FetchProducts, public storage:Storage,
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
      
      var that = this;
      this.zone = new NgZone({});
      if(navParams.get('shippingAddress')){
      this.orderShippingAddress = navParams.get('shippingAddress');
          console.log('orderShippingAddress', this.orderShippingAddress);
          
      }else if(!navParams.get('shippingAddress')){
         //shippingAddress is not set

         this.loading = this.loadingCtrl.create({
      
    
      content: 'Shipping Address is not set...'
      
    });
    
    this.loading.present();

    setTimeout(() => {
      this.loading.dismiss();
     this.navCtrl.push(SelectAddressPagePage);
    }, 2000);
       }

      
  this.user = firebase.auth().currentUser;
  this.userUID = this.user.uid;
  
 
  

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
       this.subTotalSum = 0;
       if(val){

          this.productsArray = val;
         var that = this;
         console.log('Products array in the constructor (productsArray): ', that.productsArray);
         this.productsArray.forEach(function(element, index){
           
          that.subtotalAmount = (element.count) * (Number(element.price));
          that.subTotalSum += that.subtotalAmount;
          // element.categories is an array
          that.productCategoriesID = [];
            element.categories.forEach(function(category, position){
                that.productCategoriesID.push(category.id);
            });
          
          that.products.push({product_id: element.id, quantity: element.count, subtotal: that.subtotalAmount, categories_id: that.productCategoriesID});

        });
       }else if(!val){
         this.products = val;
       }
       console.log('Products array in the constructor (products): ', that.products);
      

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
    this.couponApplicable = false; 
    this.couponRequestInitiated = true;
    this.couponRequestCompleted = false;
    if (!this.couponValidationForm.valid){
      console.log(this.couponValidationForm.value);
    } else {
      this.couponGet.useCoupon(this.couponValidationForm.value.coupon).subscribe((coupon) => {
        
        if(coupon.length == 1){
          console.log('Coupon is valid. Here it is: ', coupon);
          this.couponDetails = coupon[0];
          this.couponAmount = coupon[0].amount;
          this.discountTotalMul = ((100 - Number(this.couponAmount))/100);
          
           this.couponAmountDisplay = Math.floor(Number(this.couponAmount));
          this.couponType = coupon[0].discount_type;
          if(this.couponType == 'percent'){
            this.couponDiscountType = '%';
          }
     
          this.couponExcludeProducts = this.couponDetails.exclude_product_ids; 
          console.log('couponExcludeProducts ', this.couponExcludeProducts);

          this.couponExcludeCategories = this.couponDetails.excluded_product_categories;
          console.log('couponExcludeCategories ', this.couponExcludeCategories);
          var that = this;
          
          that.productsFinal = [];
          that.totalSum = 0;
          console.log('productsFinal ', that.productsFinal);
          console.log('products ', that.products);
          //this.products.forEach(function(element, index){
             for(let element of this.products){

            //that.couponDetails
            console.log('product_id ', element.product_id);
            console.log('Inside forEach');
            that.excludedProductsFound = false;
              //that.couponExcludeProducts.forEach(function (product, pos){
                for(let product of that.couponExcludeProducts){
                  console.log('productId ', element.product_id);
                  if(element.product_id == product){
                    that.couponApplicable = false;
                      that.totalSum += element.subtotal;
                      that.productsFinal.push({product_id: element.product_id, quantity: element.quantity, subtotal: element.subtotal, total: element.subtotal});
                       that.excludedProductsFound = true;   
                      console.log('excludedProductsFound ', that.excludedProductsFound);
                      
                      console.log('productsFinal excludeProducts ', that.productsFinal);
                      break;                      
                  }

              }
              //element.categories_id.forEach(function(category_id, pos){
                if(!that.excludedProductsFound){
                  for(let category_id of element.categories_id){
                that.excludedCategoriesFound = false;
                //that.couponExcludeCategories.forEach(function (category, position){
                  for(let category of that.couponExcludeCategories){
                   console.log('categoryId ', category_id);
                  
                  if(category_id == category){
                    that.couponApplicable = false;
                    that.totalSum += element.subtotal;
                      that.productsFinal.push({product_id: element.product_id, quantity: element.quantity, subtotal: element.subtotal, total: element.subtotal});
                       that.excludedCategoriesFound = true;   

                      console.log('productsFinal excludeCategories ', that.productsFinal);
                      break;                      
                  }
                }

                if(that.excludedCategoriesFound){
                  break;  
                }        
              }
                }
                
              
              if(!that.excludedProductsFound && !that.excludedCategoriesFound){
                that.couponApplied = true;
                that.couponApplicable = true;
                       that.totalAfterCoupon = that.discountTotalMul * element.subtotal;
                       //that.subTotalSum += Number(element.subtotal);
                   //that.totalSum += Number(that.totalAfterCoupon);
                   that.totalSum += that.totalAfterCoupon;
                that.productsFinal.push({product_id: element.product_id, quantity: element.quantity, subtotal: element.subtotal, total: that.totalAfterCoupon});
               
                      console.log('productsFinal None excluded ', that.productsFinal);
              }

          //that.productsFinal.push({product_id: element.product_id, quantity: element.quantity, subtotal: element.subtotal, total: that.totalAfterCoupon});
        }
            that.totalDiscountSum = (that.subTotalSum - that.totalSum).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];;   
        }else{
          console.log('Coupon is not valid.');
          this.couponNotFound = true;
          
        }
        this.couponRequestCompleted = true;
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
           // this.subtotalBeforeCoupon = 0;
           // this.totalAfterCoupon = 0;
            
          //  this.discountTotalMul = ((100 - Number(that.couponAmount))/100);
            
         /*   this.products.forEach(function(element, index){
             

                       
          that.productsFinal.push({product_id: element.product_id, quantity: element.quantity, subtotal: element.subtotal, total: that.totalAfterCoupon});
        });*/
           // this.totalDiscountSum = (this.subTotalSum - this.totalSum).toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
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
        "first_name": this.orderShippingAddress.first_name,
        "last_name": this.orderShippingAddress.last_name,
        "address_1": this.orderShippingAddress.address1,
        "address_2": this.orderShippingAddress.address2,
        "city": this.orderShippingAddress.city,
        "state": this.orderShippingAddress.state,
        "postcode": this.orderShippingAddress.postcode,
        "country": this.orderShippingAddress.country
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
        "first_name": this.orderShippingAddress.first_name,
        "last_name": this.orderShippingAddress.last_name,
        "address_1": this.orderShippingAddress.address1,
        "address_2": this.orderShippingAddress.address2,
        "city": this.orderShippingAddress.city,
        "state": this.orderShippingAddress.state,
        "postcode": this.orderShippingAddress.postcode,
        "country": this.orderShippingAddress.country
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
      /*
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
           

  }*/
 
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
