import { Component } from '@angular/core';
import { LogintabPage } from '../logintab/logintab';
import { SignuptabPage } from '../signuptab/signuptab';

@Component({
    selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  
  tab2Root: any = LogintabPage;
  tab3Root: any = SignuptabPage;

  constructor() {

  }
}
