import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { ProductDetailPage } from '../pages/product-detail/product-detail';
import {ItemDetailsPage} from '../pages/item-details/item-details';
import {TestPagePage} from '../pages/test-page/test-page';
import {CartPage} from '../pages/cart/cart';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    ProductDetailPage,
      ItemDetailsPage,
      TestPagePage,
      CartPage
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
CartPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage,]
})
export class AppModule {}
