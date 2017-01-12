import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Checkout page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html'
})
export class CheckoutPage {
    /*
  declare var window: any;
declare var cordova: any;
*/
 constructor(public NavCtrl:NavController,public Nav:NavParams) 
    {
        
    }
    
 /*   
 static get parameters() {
        return [[Platform]];
    }
 
    constructor(platform) {
        this.platform = platform;
    }
 
    launch(url) {
        this.platform.ready().then(() => {
            cordova.InAppBrowser.open(url, "_system", "location=true");
        });
    }
    */
}
