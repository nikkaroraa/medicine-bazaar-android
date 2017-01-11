import { NgModule, ErrorHandler } from '@angular/core';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {TestPagePage} from '../pages/test-page/test-page';
import {CartPage} from '../pages/cart/cart';
import { LocalDB } from '../providers/local-db';
import { Storage } from '@ionic/storage';
import {TabsPage} from '../pages/tabs/tabs';
import {LogintabPage} from '../pages/logintab/logintab';
import {SignuptabPage} from '../pages/signuptab/signuptab';


import { ResetPasswordPage } from '../pages/reset-password/reset-password';
import {CheckoutPage} from '../pages/checkout/checkout';
import {FbLoginPage} from '../pages/fb-login/fb-login';
// Import Providers
import { AuthData } from '../providers/auth-data';

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
      FbLoginPage

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
FbLoginPage
      
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, LocalDB, Storage, AuthData]

})
export class AppModule {}
