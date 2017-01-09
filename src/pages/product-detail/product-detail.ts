import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchProduct } from '../../providers/search-product.service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/*
  Generated class for the ProductDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
providers: [ SearchProduct ]
})
export class ProductDetailPage {

selectedItem: any;
s_products: any;
 selectedItemName: any;
public itemUpsell: Array<any> = [];
public substitutes: Array<any> = [];
public product:any;
public cartProducts: Array<any> = [];
public cartInitialised : any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProduct: SearchProduct,public toastCtrl: ToastController,public storage: Storage) {
      //storage try
/*       this.storage.get("cartInitialised").then((val) => {
       console.log('The value of cartInitialised is: in the constructor' + val);
this.cartInitialised = val; 
       });*/
     // Or to get a key/value pair
this.storage.get('cartInitialised').then((val)=>{
   if(!val){
        console.log("Exists or not:", this.storage.get('cartInitialised'));
        console.log("Cart is not initialised yet");
          this.cartInitialised = false;
   }else{
    this.cartInitialised = true;   
   } 
});
      
      //end storage try
      this.selectedItem = navParams.get('product');
      this.selectedItemName = this.selectedItem.name;
     /* for(var i =0; i < this.selectedItem.upsell_ids.length; i++){
      this.selectedItemUpSellId.push(this.selectedItem.upsell_ids[i]);
          console.log("The Ids are" + this.selectedItemUpSellId);
      }*/
console.log(this.selectedItem.upsell_ids.length);
console.log("The selected item name is:" + this.selectedItemName);
for(var j = 0; j < this.selectedItem.upsell_ids.length; j++){
console.log("Upsell Id: " + this.selectedItem.upsell_ids[j]);
this.itemUpsell.push(this.selectedItem.upsell_ids[j]);
//this.searchProducts(this.selectedItem);
console.log("The id's are " + this.itemUpsell);
}
this.searchProduct.load(this.selectedItemName)
    .then(data => {
        
    this.s_products = data;
console.log("The retrieved detailed product is" + this.s_products);

        
  });
for(var j=0; j< this.itemUpsell.length; j++){
this.searchProduct.loadById(this.itemUpsell[j])
   .then(data => {
    
    console.log("Value of "+ j + data);
this.substitutes.push(data);
    console.log(this.substitutes);
});
}
  }
  //toast for gocart bottom popup
   showToast(position:string,product) {
    console.log("Buy product :" + product);

if(!(this.cartInitialised)){
console.log("Cart is not initialised yet");
this.storage.set("cartProducts", product);
this.storage.set('cartInitialised', true);
this.cartInitialised = true;
}else{
console.log('Cart is initialised: ', this.cartInitialised);
console.log('Now the cart is initialised');

    this.storage.get('cartProducts').then((val)=> {
        
       console.log('Inside the showToast: ', val);
this.cartProducts = [];
if(val.length >=2 ){
    for(var i = 0; i < val.length ; i++){
        this.cartProducts.push(val[i]);
    }

}

else{
this.cartProducts.push(val);
}

        this.cartProducts.push(product);
console.log(this.cartProducts);

this.storage.set('cartProducts', this.cartProducts);
//console.log("After pushing, inside the showToast", val);
    });
}
       
   let toast = this.toastCtrl.create({
    message: 'Check your Cart',
    duration: 3000,
    position: 'bottom'
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
     this.storage.get('cartProducts').then((val) => {
       console.log('The Products in the cart are: ', val);
     }); 
  });

  toast.present(toast);
}
//end of toast
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
clearKey(){
    
 
this.storage.remove("cartProducts");
this.cartInitialised = false;
console.log('cartProducts key removed successfully and cartInitialised local var is set to false');
}
 clearAnother(){
     
     this.storage.remove('cartInitialised');
     console.log('cartInitalised key removed successfully. Defautl is set to false');
 }
    
}
