import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Globalvariable } from '../../providers/globalvariable';
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
  providers: [ Globalvariable ]
})
export class ItemDetailsPage {
  selectedItem: any;
items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage,public globalvariable:Globalvariable) {
      //storage try
      
      //storage try end
      // If we navigated to this page, we will have an item available as a nav param
    this.selectedItem = navParams.get('item');
 for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
     // this.initialiseCart();
      //this.updateCart();
      this.getglobal();
      this.updateglobal();
  }
 initialiseCart()
 {
       this.storage.set("cartInitialised", true);
       this.storage.get("cartInitialised").then((val) => {
       console.log('The value of cartInitialised is: in the 1 ' + val);
 
       });
    

 }
updateCart()
{
    
    this.storage.set("cartInitialised", false);  
    this.storage.get("cartInitialised").then((val) => {
       console.log('The value of cartInitialised is: in the 2 ' + val);

       });
    
}
getglobal()
{
    this.globalvariable.getCartInitialised();
}
updateglobal()
{
    this.globalvariable.updateCartInitialised();
    this.getglobal();
}

doInfinite(infiniteScroll) {
    
    console.log('Begin async operation');

    setTimeout(() => {
      for (let i = 0; i < 30; i++) {
        this.items.push( this.items.length );
      }

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

}
