import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { TestPagePage } from '../pages/test-page/test-page';
import { CartPage } from '../pages/cart/cart';
import { LocalDB } from '../providers/local-db';
import { Storage } from '@ionic/storage';
import { TabsPage } from '../pages/tabs/tabs';
import { LogintabPage } from '../pages/logintab/logintab';
import { SignuptabPage } from '../pages/signuptab/signuptab';
import { MyAccountPage } from '../pages/my-account/my-account';
import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import { CheckoutPage } from '../pages/checkout/checkout';
import { FbLoginPage } from '../pages/fb-login/fb-login';
import { GoogleLoginPage } from '../pages/google-login/google-login';
import { UserPage } from '../pages/user/user';
import { AccountPage } from '../pages/account/account';
import { LogoutPage } from '../pages/logout/logout';
import { MyOrdersPage } from '../pages/my-orders/my-orders';
import { UpdateAccountInfoPage } from '../pages/update-account-info/update-account-info';
import { OrderDescriptionPage } from '../pages/order-description/order-description';
import { LastOrderPage } from '../pages/last-order/last-order';
import { LoginTestPage } from '../pages/login-test/login-test';
import { SigninModalPage } from '../pages/signin-modal/signin-modal';
import { ListPage } from '../pages/list/list';
import { AddressPage } from '../pages/address/address';
// Import Providers

import { AuthData } from '../providers/auth-data';


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
    ItemDetailsPage,
    TestPagePage,
    CartPage,
    TabsPage,
    LogintabPage,
    SignuptabPage,
    ResetPasswordPage,
    CheckoutPage,
    FbLoginPage,
    GoogleLoginPage,
    UserPage,
    AccountPage,
    LogoutPage,
    MyAccountPage,
    MyOrdersPage,
    UpdateAccountInfoPage,
    OrderDescriptionPage,
    LastOrderPage,
    LoginTestPage,
    SigninModalPage,
    ListPage,
    AddressPage

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
    ItemDetailsPage,
    TestPagePage,
    CartPage,
    TabsPage,
    LogintabPage,
    SignuptabPage,
    ResetPasswordPage,
    CheckoutPage,
    FbLoginPage,
    GoogleLoginPage,
    UserPage,
    AccountPage,
    LogoutPage,
    MyAccountPage,
    MyOrdersPage,
    UpdateAccountInfoPage,
    OrderDescriptionPage,
    LastOrderPage,
    LoginTestPage,
    SigninModalPage,
    ListPage,
    AddressPage
      
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LocalDB, Storage, AuthData]

})
export class AppModule {}
