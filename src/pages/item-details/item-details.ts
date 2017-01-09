import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  selectedItem: any;
items = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage) {
    // If we navigated to this page, we will have an item available as a nav param
      this.storage.ready();
      this.storage.set("name","hello");
    this.storage.get("name").then((val)=>{
       console.log("name is 1:",val); 
        
    });
    this.storage.remove("name").then(() => { });

      this.storage.set("name","nikhil");
    this.storage.get("name").then((val)=>{
       console.log("name is 2:",val); 
    });
    this.selectedItem = navParams.get('item');
 for (let i = 0; i < 30; i++) {
      this.items.push( this.items.length );
    }
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
