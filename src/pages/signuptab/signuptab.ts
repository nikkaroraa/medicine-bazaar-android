import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the Signuptab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signuptab',
  templateUrl: 'signuptab.html'
})
export class SignuptabPage {
  public newUser:any={};
  public billing_address:any={};
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  //user signup 
  signUp(newUser,billing_address)
  {
      console.log("signUp function");
  }
  
 ionViewDidLoad() {
    console.log('ionViewDidLoad SignuptabPage');
  }

}
