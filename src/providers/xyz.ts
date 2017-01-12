import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
/*
  Generated class for the Xyz provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Xyz {

 
    public HAS_LOGGED_IN = 'hasLoggedIn';
    public HAS_SEEN_TUTORIAL = 'hasSeenTutorial';
  constructor(public http: Http, public storage: Storage) {
      
    console.log('Hello Storage Provider');
  }

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

