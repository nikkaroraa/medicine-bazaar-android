import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage}  from '@ionic/storage';
/*
  Generated class for the Globalvariable provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Globalvariable {
   public cartInitialised : any;
   constructor(public storage:Storage) {
    this.cartInitialised=true;
  }
    getCartInitialised()
    {
        console.log(this.cartInitialised);
    }
    updateCartInitialised()
    {
        this.cartInitialised=false;
        console.log(this.cartInitialised);
    }

}
