import { Component } from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import {Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import { Xyz } from '../../providers/xyz';



/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',
  providers: [Xyz]
})

export class TestPagePage {
  
    
    
    
 
  constructor(public xyz:Xyz) {
     
  }

  callPayment()
  {
      this.xyz.paymentGateway();
  }

  openBrowser(){
      
      let browser = new InAppBrowser('https://ionic.io', '_blank', 'location=no');
  }

}
