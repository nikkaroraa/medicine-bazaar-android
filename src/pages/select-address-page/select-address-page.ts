import { Component,NgZone } from '@angular/core';
import { NavController, NavParams,LoadingController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import {AddressPage} from '../address/address';
import {CheckoutPage } from '../checkout/checkout';
/*
  Generated class for the SelectAddressPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-select-address-page',
  templateUrl: 'select-address-page.html'
})
export class SelectAddressPagePage {
public orderForm: FormGroup;
public user: any;
public userProfile: any;
public userUID: any;
public userDetails: any = {};
public userBilling: any = {};
public userShipping: any = {};
zone: NgZone;
loading: any;
differentAddressFlag: boolean = false;
useDifferentAddress: boolean = false;
submitAttempt: boolean = false;
shipping: any;
orderPlaced: boolean = false;

  
  constructor(public formBuilder:FormBuilder,public navCtrl:NavController,public nav:NavParams,
  	public loadingCtrl: LoadingController,public toastCtrl: ToastController,public storage:Storage) {
  	 this.orderForm=this.formBuilder.group({
          sFirstName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          sLastName: ['', Validators.compose([Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
          sAddress1:['', Validators.compose([Validators.maxLength(70),  Validators.required])],
          sAddress2:['', Validators.compose([Validators.maxLength(70)])],
          sPinCode:['', Validators.compose([Validators.maxLength(6), Validators.pattern('[0-9 ]*'), Validators.required])],
          sCountry:['India',],
          sState:['Delhi',],
          sCity:['New Delhi',],
          snearestLandmark: ['', Validators.compose([Validators.maxLength(70)])]


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
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectAddressPagePage');
  }

  setShippingAddressDefault(){

  	this.shipping =  {
        first_name: this.userShipping.first_name,
        last_name: this.userShipping.last_name,
        address1: this.userShipping.address1,
        address2: this.userShipping.address2,
        city: this.userShipping.city,
        state: this.userShipping.state,
        postcode: this.userShipping.postcode,
        country: this.userShipping.country
      };
      this.orderPlaced = true;
      	console.log('this.shippingAddressDefault ', this.shipping);
setTimeout(() => {
            }, 500);
	this.navCtrl.push(CheckoutPage, {
       shippingAddress: this.shipping
     });

  }
   elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
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

  setShippingAddress(){
if(this.orderForm.valid){
this.submitAttempt=true;
 this.orderPlaced = true;

	 this.shipping = {
        first_name: this.orderForm.value.sFirstName,
    last_name: this.orderForm.value.sLastName,
    
    address1: this.orderForm.value.sAddress1,
    address2: this.orderForm.value.sAddress2 + '<br />Near: ' + this.orderForm.value.snearestLandmark,
    city: this.orderForm.value.sCity,
    state: this.orderForm.value.sState,
    postcode: this.orderForm.value.sPinCode,
    country: this.orderForm.value.sCountry
    

      };
	
	console.log('this.shippingAddressSet ', this.shipping);
	setTimeout(() => {
            }, 500);
	this.navCtrl.push(CheckoutPage, {
       shippingAddress: this.shipping
     });
}else

{
  let toast = this.toastCtrl.create({
        message: 'Please fill up all the fields',
        duration: 2000,
        position: 'bottom'
       });

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
        
      });

      toast.present(toast);


}


  	    
  }
  cancel(){
   
     this.navCtrl.popToRoot();
    
  }

}
