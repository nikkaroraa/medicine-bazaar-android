import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ProductDetailPage } from '../pages/product-detail/product-detail';

import { CartPage } from '../pages/cart/cart';
import { LocalDB } from '../providers/local-db';
import { Storage } from '@ionic/storage';


import { MyAccountPage } from '../pages/my-account/my-account';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { CheckoutPage } from '../pages/checkout/checkout';

import { AccountPage } from '../pages/account/account';

import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { UpdateAccountInfoPage } from '../pages/update-account-info/update-account-info';
import { OrderDescriptionPage } from '../pages/order-description/order-description';
import { LastOrderPage } from '../pages/last-order/last-order';
import { LoginTestPage } from '../pages/login-test/login-test';
import { SigninModalPage } from '../pages/signin-modal/signin-modal';

import { AddressPage } from '../pages/address/address';
// Import Providers

import { AuthData } from '../providers/auth-data';
import { TestCategoryPage } from '../pages/test-category/test-category';
import { SearchCategoryPage } from '../pages/search-category/search-category';

// YOUR SETTINGS GOES HERE!



/*
export function provideStorage() {
 return new Storage(['sqlite', 'websql', 'indexeddb'], { name: '__mydb' }// optional config);
}
  */         
          
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    ProductDetailPage,
    
    CartPage,
   
    ResetPasswordPage,
    CheckoutPage,
    
    AccountPage,
    
    MyAccountPage,
    MyOrdersPage,
    UpdateAccountInfoPage,
    OrderDescriptionPage,
    LastOrderPage,
    LoginTestPage,
    SigninModalPage,
    
    AddressPage,
    TestCategoryPage,
    SearchCategoryPage
    
   

  ],
  imports: [
    IonicModule.forRoot(MyApp)
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    ProductDetailPage,
    
    CartPage,
    
    ResetPasswordPage,
    CheckoutPage,
    
    AccountPage,
    
    MyAccountPage,
    MyOrdersPage,
    UpdateAccountInfoPage,
    OrderDescriptionPage,
    LastOrderPage,
    LoginTestPage,
    SigninModalPage,
   
    AddressPage,
    TestCategoryPage,
    SearchCategoryPage   
    
      
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LocalDB, Storage, AuthData]

})
export class AppModule {}
