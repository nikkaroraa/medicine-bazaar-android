import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
  Generated class for the Xyz provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Xyz {

    public url='https://test.payu.in/_payment';
    public HAS_LOGGED_IN = 'hasLoggedIn';
    public HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  constructor(public http: Http, public storage: Storage) {
      
    console.log('Hello Storage Provider');
  }
   //payment gateway 

     paymentGateway() {
		let headers = new Headers({
			'Content-Type': 'application/json',
            'Authorization': ' 	jMSVwuKe+wEjNbcVLCX+Oav1Ky6xZvZJV/8AjLdg2Ew=',
		});
		let options = new RequestOptions({
			headers: headers
		});
		let body = JSON.stringify({
			 key:"83yOHr", 
             txnid:"12345",
             amount:"3",
             productinfo:"abcdedfffffffffffs",
             firstName: "John",            
              email: "john.doe@example.com",
             phone: "654111654",
             surl:"https://www.google.com",
             furl:"https://www.google                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           .co.in",
             hash:"89A8C5F0F534FA47035B6AA4CE03E229401B0181D46DDC3A3206D9FAB24A4C2EE5EE2EA3F60F31B9B4E225E0C46C7DD8419107D4015B04E903349464F1CA8BC2"      
		});
		return this.http.post("https://test.payu.in/_payment", body, options)
			.toPromise()
			.then(response => console.log(response.json()), this.handleError);
	}

	handleError(error) {
		console.log(error);
		return error.json().message || 'Server error, please try again later';
	}


//end 

    initialiseSet() {
        this.storage.set(this.HAS_LOGGED_IN, true);


    }
    initialiseGet(){
        this.storage.get(this.HAS_LOGGED_IN).then((val)=>{
            console.log("Initialised value: ", val );
      });
}


    finaliseSet() {
        this.storage.set(this.HAS_LOGGED_IN, false);


    }
    finaliseGet(){
        this.storage.get(this.HAS_LOGGED_IN).then((val)=>{
            console.log("Finalised value: ", val );
      });
}
}

