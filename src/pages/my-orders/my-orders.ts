import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FetchProducts } from '../../providers/fetch-products.service';
/*
  Generated class for the MyOrders page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-my-orders',
  templateUrl: 'my-orders.html'
})
export class MyOrdersPage {
 public data:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public fetchProducts:FetchProducts){ 

   console.log("call get all orders ...");
    
     
    // Orders for a particular customer
    
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
   


	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyOrdersPage');
  }

}
