import { Component, NgZone } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FetchProducts } from '../../providers/fetch-products.service';
import {OrderDescriptionPage} from '../order-description/order-description';
import firebase from 'firebase';
/*
  Generated class for the MyOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html',
  providers: [FetchProducts]
})
export class MyOrdersPage {
 public data:any;
 //public orderSerial: Array<any>  = [];
 public myOrders: Array<any> = [];
 public orderDate: Array<any> = [];
 public user: any;
 public userUID: any;
 userProfile: any; 
 zone: NgZone;
userDetails: any;
customerDescription: any;
customerID: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchProducts:FetchProducts){ 
this.zone = new NgZone({});
   console.log("Call get all orders ...");
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
          console.log(that.userDetails);
          that.customerDescription = that.userDetails.customerDescription;
          that.customerID = that.customerDescription.customerID;

        } 
        });
    });
     
    // Orders for a particular customer
    
    this.fetchProducts.getAllOrders().subscribe(data => {
        this.data = data;
        for(var i=0;i<this.data.length;i++)
        {
          if(this.data[i].customer_id == this.customerID)
          {
            //this.orderSerial.push(i);
            this.data[i].dateCreated = this.data[i].date_created.substr(0,10);
            this.myOrders.push(this.data[i]);
            console.log(this.data[i]);

          }

        }
        //console.log(this.data);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });

   


	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
  }

  orderSelected(myOrder){

   this.navCtrl.push(OrderDescriptionPage, {
      myOrder: myOrder
    });
  }

}
