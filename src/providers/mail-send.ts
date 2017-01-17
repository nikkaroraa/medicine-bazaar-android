import { Injectable } from '@angular/core';
import { Http , Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the MailSend provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MailSend {
  public data={
  "personalizations": [
    {
      "to": [
        {
          "email": "dalipkumar703@gmail.com"
        }
      ],
      "subject": "Hello, World!"
    }
  ],
  "from": {
    "email": "dalipkumar703@gmail.com"
  },
  "content": [
    {
      "type": "text/plain",
      "value": "Hello, World!"
    }
  ]
};

  constructor(public http: Http) {
    console.log('Hello MailSend Provider');
  }
  mailSending()
  {
  	 let requestHeaders = new Headers({ "Authorization":"Bearer E54yXIgDR1aioHcReU1hlA",
  	 "Content-Type": "application/json"
  	 });

     let options = new RequestOptions({
      headers: requestHeaders
    });    
     let body = JSON.stringify(this.data);
     console.log("stringify object",body);console.log("array data",this.data);
        return this.http.post("https://api.sendgrid.com/v3/mail/send",body,options)
        .map(res => res.json());
    
  
  
  
}

}