import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the SendSms provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SendSms {
  public user:any={}; 
  /*={
 "countryCode": "91",
 "mobileNumber": "9818418721",
 "getGeneratedOTP": true
};
*/
  constructor(public http: Http) {
    
  }
  //send sms
  sendSMS(phone)
  {
    this.user.countryCode=91;
    this.user.mobileNumber=phone;
    this.user.getGeneratedOTP=true;
  	let headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'application-Key': 'o5lW1KuiaEKocddJJ2Ez2q-1OySU8zOW3BhbPOT06NFtcuRIq6TDqxO51KWHpTIPxyZ28BYkWGe2M4M5jPeL8ySz5fk3cNK4-l47TK06_g5z5V1WfpwuK6ZYhbWZopX2HKybNBVpaIyjkxMVFVb__g=='
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(this.user);
     console.log("stringify object",body);console.log("array customer",this.user);
   return this.http.post('https://sendotp.msg91.com/api/generateOTP',body,options)
      .map(res => res.json()); 
  }
  //verify sms
  
  verifySms(verify)
  {
   let headers = new Headers({
      'Content-Type': 'application/json; charset=UTF-8',
      'application-Key': 'o5lW1KuiaEKocddJJ2Ez2q-1OySU8zOW3BhbPOT06NFtcuRIq6TDqxO51KWHpTIPxyZ28BYkWGe2M4M5jPeL8ySz5fk3cNK4-l47TK06_g5z5V1WfpwuK6ZYhbWZopX2HKybNBVpaIyjkxMVFVb__g==',
      'Access-Control-Allow-Origin': '*'
    });
    let options = new RequestOptions({
      headers: headers
    });
    let body = JSON.stringify(verify);
     console.log("stringify object",body);console.log("array customer",verify);
   return this.http.post('https://sendotp.msg91.com/api/verifyOTP',body,options)
      .map(res => res.json());  
  }
  

}
