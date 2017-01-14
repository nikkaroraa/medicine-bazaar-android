import { Component } from '@angular/core';
import {InAppBrowser} from 'ionic-native';
import { Http, Headers, RequestOptions} from 'angular2/http';
import 'rxjs/Rx';
import {Injectable} from 'angular2/core';
import { Xyz } from '../../providers/xyz';
import {FetchProducts } from '../../providers/fetch-products.service';



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
  
    public data:any;
    
    
 

  constructor(public xyz:Xyz,public fetchProducts:FetchProducts) {
    console.log("call create User ...");
   /* this.fetchProducts.createUser().subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        console.log(this.data);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
   
*/
  }

  callPayment()
  {
      
  }

  openBrowser(){
      let browser = new InAppBrowser('https://medicinebazaar.in/payumoney/index.php', '_blank')
      
  }

}
