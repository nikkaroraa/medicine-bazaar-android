import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SearchProduct } from '../../providers/search-product.service';
import { ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { SearchPage } from '../search/search'; 
import { CartPage } from '../cart/cart'; 

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
    public cartInitialised: any = false;
    public countIncreased = false;
    public productCount:any = 0;
  constructor(public navCtrl: NavController, public navParams: NavParams, public searchProduct: SearchProduct,public toastCtrl: ToastController,public storage: Storage) {
      //storage try
      /*       
      this.storage.get("cartInitialised").then((val) => {
          console.log('The value of cartInitialised is: in the constructor' + val);
          this.cartInitialised = val; 
      });*/
      // Or to get a key/value pair
      /*this.storage.get('productCount').then((val)=>{
         
            this.cartProducts.length = val;
         
      });*/
      this.storage.get('productCount').then((val)=>{
        if(!val){
            this.productCount = 0;
        }
        else{
            this.productCount = val;
        }
            
         
      });
      this.storage.get('cartInitialised').then((val)=>{
        if(!val)
        {
            console.log("Exists or not:", this.storage.get('cartInitialised'));
            console.log("Cart is not initialised yet");
            this.cartInitialised = false;
        }
        else
        {
            this.cartInitialised = true;   
        } 
      });
      
      //end storage try
      this.selectedItem = navParams.get('product');
      this.selectedItemName = this.selectedItem.name;
      /* 
      for(var i =0; i < this.selectedItem.upsell_ids.length; i++){
          this.selectedItemUpSellId.push(this.selectedItem.upsell_ids[i]);
          console.log("The Ids are" + this.selectedItemUpSellId);
      }
      */
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
            console.log("The retrieved detailed product is",this.s_products);
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


  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');

  }
    //toast for gocart bottom popup
    showToast(position:string,product) {
        console.log("Buy product :" + product);
        var that = this;
    if(!(this.cartInitialised))
    {
        console.log("Cart is not initialised yet");
        this.cartProducts = []; 
        product.count = 1;
            
        console.log("Product Count set to 1");
        this.cartProducts.push(product);
        this.storage.set("cartProducts", this.cartProducts);
        this.storage.set("productCount", this.cartProducts.length);
        this.productCount = this.cartProducts.length;
        this.storage.set('cartInitialised', true);
        this.cartInitialised = true;
    }
    else
    {
        console.log('Cart is initialised: ', this.cartInitialised);
        console.log('Now the cart is initialised');

        this.storage.get('cartProducts').then((val)=> {

           console.log('Inside the showToast: ', val);
           this.cartProducts = [];

           for(var i = 0; i < val.length ; i++){
                this.cartProducts.push(val[i]);
           }
           this.cartProducts.forEach(function (item, index){
            console.log("This is forEach", item);
               if(item.id == product.id){
                   console.log(item.id + "==" + product.id);
                   item.count +=1;
                   console.log("Count increased by 1");
                   console.log("Value of count is:", item.count);
                   that.countIncreased = true;
                   console.log("The value of countIncreased: ", that.countIncreased);
               }
               

           });
            if(!this.countIncreased){
                product.count = 1;
                this.cartProducts.push(product);
                this.storage.set('productCount', this.cartProducts.length);
                this.productCount = this.cartProducts.length;
                console.log("Product Count set to 1");
            }

        
            console.log(this.cartProducts);
        
        /*
        this.cartProducts.forEach(function(item, index){
            if(item.id == product.id && !this.countIncreased){
                console.log(item.id + "==" + product.id);
                item.count += 1;
                console.log("count increased by 1 for " + item.title);
                this.countIncreased = true;    
            }
        });
        if(!this.countIncreased){
          product.count = 1;
          this.cartProducts.push(product);
        }
        */    
        this.storage.set('cartProducts', this.cartProducts);

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
 
       clearKey(){


        this.storage.remove("cartProducts");
        this.cartInitialised = false;
        console.log('cartProducts key removed successfully and cartInitialised local var is set to false');
    }
    clearAnother(){

         this.storage.remove('cartInitialised');
         console.log('cartInitalised key removed successfully. Defautl is set to false');
    }
    checkCart(){
    
    this.navCtrl.push(CartPage);
    }
    navSearch(){
    
    this.navCtrl.push(SearchPage);
    }
    ionViewDidEnter(){
    this.storage.get('productCount').then((val)=>{
        if(!val){
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = 0;
        }
        else{
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = val;
        }
            
         
      });
}
  /*decreaseCount(product){
      var that = this;
    //  product.count--;
      this.cartItems.forEach(function(element, index){
         if(element.id == product.id){
             if(element.count <= 1){
                that.deleteItem(element);   
                 
             }else{
             element.count--;
             console.log("Decremented the value in the cartItems array");
             that.storage.set('cartProducts', that.cartItems);
             console.log("Successfully made the changes in the storage element (Decremented)");
                 console.log("Count decreased by 1 for: ", product.name);
      that.costSum = that.costSum - Number(product.price);
      that.costSumString = that.costSum.toFixed(2);
             }
         } 
      }); 
      
  }
    */
}
