import { Component, ViewChild,NgZone,ChangeDetectorRef } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';


import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';

import { CartPage } from '../pages/cart/cart';




import { AccountPage } from '../pages/account/account';
import firebase from 'firebase';

import { MyAccountPage } from '../pages/my-account/my-account';


import {AddressPage} from '../pages/address/address';
import { LoginTestPage } from '../pages/login-test/login-test';
import { Storage } from '@ionic/storage';   
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;


  // make HelloIonicPage the root (or first) page
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  account: Array<{title: string, component: any}>;
  zone: NgZone;
  nZone: NgZone;
  loggedIn : boolean = false;
  changeDetectorRefs:ChangeDetectorRef[] = [];
  constructor(
    public platform: Platform,
    public menu: MenuController,
    public storage: Storage
  ) {

   const firebaseConfig = {
      apiKey: "AIzaSyByyA3R_KJMD2LF9G95eu7qM5xGA7evMGc",
      authDomain: "medicinebazaarandroid.firebaseapp.com",
      databaseURL: "https://medicinebazaarandroid.firebaseio.com",
      storageBucket: "medicinebazaarandroid.appspot.com",
      messagingSenderId: "420052832956"
    };      
    
    firebase.initializeApp(firebaseConfig); 
    this.zone = new NgZone({});

firebase.auth().onAuthStateChanged((user) => {
  this.zone.run( () => {
    if (!user) {
      
    } else { 
      
    }
  });     
});
  /*  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
      // User is signed in.
      } else {
      // No user is signed in.
      }
    });
  */ 
   /* firebase.auth().onAuthStateChanged( user => {
      if (!user) {
        this.rootPage = LogintabPage;
        console.log("There's not a logged in user!");
      }
    });*/

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
    // set our app's pages
    this.pages = [
    
      {title: 'Search Products', component: SearchPage},
      
      {title: 'Cart', component: CartPage},
      
      {title: 'Login Test', component: LoginTestPage},
      {title: 'Checkout', component: AddressPage},
     

     
      
    ];

   
  }



  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
      this.nav.push(page.component);
  }
  openAccount() {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
    if(this.loggedIn){
      this.nav.push(MyAccountPage);
    }else{
      this.nav.push(AccountPage);
    }
  }
  tick() {
    this.changeDetectorRefs
      .forEach((ref) => ref.detectChanges());
  }
  menuOpen(){
     this.nZone = new NgZone({});

    var that = this;
    this.storage.get('userDetails').then((val)=>{
      
       this.nZone.run(()=>{

console.log(val);
          if(val){
          that.loggedIn = true;
        }else{
          that.loggedIn = false;
        }
    
       console.log('logged: ',that.loggedIn);

       });
         
    });
  }
}
