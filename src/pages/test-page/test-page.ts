import { Component } from '@angular/core';
import {InAppBrowser} from 'ionic-native';


/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',

})
export class TestPagePage {

 
  constructor() {
     
  }
  openBrowser(){
        let browser = new InAppBrowser('https://ionic.io', '_system');
  }

  

}
