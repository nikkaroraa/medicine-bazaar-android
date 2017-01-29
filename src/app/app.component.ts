import { Component, ViewChild,NgZone } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar, Splashscreen } from 'ionic-native';


import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { TestPagePage } from '../pages/test-page/test-page';
import { CartPage } from '../pages/cart/cart';
import { ListPage } from '../pages/list/list';

import { FbLoginPage } from '../pages/fb-login/fb-login';
import { GoogleLoginPage } from '../pages/google-login/google-login';

import { AccountPage } from '../pages/account/account';
import firebase from 'firebase';
import { LogoutPage } from '../pages/logout/logout';
import { MyAccountPage } from '../pages/my-account/my-account';


import {AddressPage} from '../pages/address/address';
import { LoginTestPage } from '../pages/login-test/login-test';

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
  constructor(
    public platform: Platform,
    public menu: MenuController
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
      
      
      {title: 'Account', component: AccountPage},
      
    ];

    this.account = [


      {title: 'Logout', component: LogoutPage},
      {title: 'My Account', component: MyAccountPage},
      {title: 'Login Test', component: LoginTestPage},
      {title: 'Checkout', component: AddressPage}

    ];
      
  }



  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    //this.nav.setRoot(page.component);
      this.nav.push(page.component);
  }
}
