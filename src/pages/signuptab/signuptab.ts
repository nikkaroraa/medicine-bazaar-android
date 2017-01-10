import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FetchProducts } from '../../providers/fetch-products.service';
/*
  Generated class for the Signuptab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-signuptab',
  templateUrl: 'signuptab.html',
  providers:[FetchProducts]
})
export class SignuptabPage {
  public newUser:any={};
  public billing_address:any={};
  public user:any; 
  constructor(public navCtrl: NavController, public navParams: NavParams,public fetchProducts:FetchProducts) {
      this.newUser.isvalid=true;
  }
  //user signup 
  signUp(newUser,billing_address)
  {
      console.log("signUp function");
  }
  
 ionViewDidLoad() {
    console.log('ionViewDidLoad SignuptabPage');
  }
 //check email
 checkUserEmail(email)
 {
     
    
    var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if(!regex.test(email)){
      
      this.newUser.isValid = false;
      /*
      $ionicPopup.show({
        template: "<center>Invalid Email! Please Check!</center>",
        buttons: [{
          text: 'OK'
        }]
      });
      */
        console.log(this.newUser.isValid);
        console.log(email);
        console.log("invalid email");
      
      return;
      
    }
    
    
    this.fetchProducts.searchUser(email).subscribe(user => {
        this.user=user;
console.log(this.user);
      });
    /*
    Woocommerce.get('customers/email/'+email,  function(err, data, res){
      
      if(err)
        console.log(err);
        
      if(JSON.parse(this.user).customer){
      
       if(this.user) {
        this.newUser.isValid = false;
        
        $ionicPopup.show({
          template: "<center>EMail is already registered. Please login or use another email address.</center>",
          buttons: [{
            text: "Login",
            onTap: function(e){
              $state.go("app.login");
            }
          },{
            text: "OK"
          }]
        })
        
      }
      else{
        this.newUser.isValid = true;
      }
  
})
*/
 }

}
