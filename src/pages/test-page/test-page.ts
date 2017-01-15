import { Component } from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import { Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import { Xyz } from '../../providers/xyz';
import {FetchProducts } from '../../providers/fetch-products.service';

import { Storage } from '@ionic/storage';


/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',
  providers: [Xyz, FetchProducts]
})

export class TestPagePage {
  
    public data = {};
    
    
 

  constructor(public storage:Storage) {
    
   this.storage.get('userDetails').then((val)=>{
     this.data = val;
            console.log("User Details are: ", val);
            console.log("Data is: ", this.data);
          });
  }

  callPayment()
  {
      
  }

  openBrowser(){
      let browser = new InAppBrowser('https://medicinebazaar.in/payumoney/index.php', '_blank')
      
  }

}
