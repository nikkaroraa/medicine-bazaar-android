import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html'
})
export class ProductDetailPage {
selectedItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {this.selectedItem = navParams.get('item');
console.log(this.selectedItem);}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }

}
