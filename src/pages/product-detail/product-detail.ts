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
      console.log("Lol",this.selectedItem);  
                       
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
            this.storage.get('cartProducts').then((val)=> {

              if(val){

               var that = this;
               console.log('Inside the showToast: ', val);
               this.cartProducts = [];

               for(var i = 0; i < val.length ; i++){
                    this.cartProducts.push(val[i]);
               }
               this.cartProducts.forEach(function (item, index){
                console.log("This is forEach", item);
               if(item.id == that.s_products[0].id){
                   console.log(item.id + "==" + that.s_products[0].id);
                   that.s_products[0].count  = item.count;
                   console.log("Count changed");
                   
               }
               

               });
              }
              
            

        
           

        });
    if(!this.s_products[0].count){
      console.log("Count is 0");
      this.s_products[0].count = 0;
      console.log("After", this.s_products[0]);
    }else{

    }
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
    
    if(product.count){


      if(!(this.cartInitialised))
    {
        console.log("Cart is not initialised yet");
        this.cartProducts = []; 
        //product.count = 1;
            
        console.log("Product Count set to:", product.count);
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
                   item.count  = product.count;
                   console.log("Count changed");
                   console.log("Value of count is:", item.count);
                   that.countIncreased = true;
                   console.log("The value of countIncreased: ", that.countIncreased);
               }
               

           });
            if(!this.countIncreased){
                //product.count = 1;
                this.cartProducts.push(product);
                this.storage.set('productCount', this.cartProducts.length);
                this.productCount = this.cartProducts.length;
                console.log("Product Count set to:", product.count);
            }

        
            console.log(this.cartProducts);
        
          
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
      this.navCtrl.pop();
    }else{

      //product.count set to 0

      let toast = this.toastCtrl.create({
        message: 'Increase the quantity to 1',
        duration: 2000,
        position: 'bottom'
       });      

      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
         
      });

      toast.present(toast);
    }

    
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
  decreaseCount(product){
      
    //  product.count--;
             product.count--;
             console.log("Decremented the value in the products array");
             //this.storage.set('cartProducts', product);
             console.log("Successfully made the changes in the storage element (Decremented)");
                 console.log("Count decreased by 1 for: ", product.name);
                 console.log("Product.count", product.count);
             }    
          
       
   increaseCount(product){
      
    //  product.count--;
             product.count++;
             console.log("Incremented the value in the products array");
            // this.storage.set('cartProducts', product);
             console.log("Successfully made the changes in the storage element (Decremented)");
                 console.log("Count decreased by 1 for: ", product.name);
             console.log("Product.count", product.count);
              }      
  
    
}
