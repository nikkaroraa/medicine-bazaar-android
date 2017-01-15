import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FetchProducts } from '../../providers/fetch-products.service';
import {OrderDescriptionPage} from '../order-description/order-description';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchProducts:FetchProducts){ 

   console.log("Call get all orders ...");
    
     
    // Orders for a particular customer
    
    this.fetchProducts.getAllOrders().subscribe(data => {
        this.data = data;
        for(var i=0;i<this.data.length;i++)
        {
          if(this.data[i].customer_id == 2)
          {
            //this.orderSerial.push(i);
            this.data[i].dateCreated = this.data[i].date_created.substr(0,9);
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
