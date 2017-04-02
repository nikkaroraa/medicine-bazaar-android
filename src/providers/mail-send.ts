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
  public data:any={};

  constructor(public http: Http) {
    console.log('Hello MailSend Provider');
  }
  mailSending(base64,imageData,CustomerEmail,CustomerContact)
  {
     let requestHeaders = new Headers({ 
     "Content-Type": "application/json"
     });
     this.data={
    "key": "raKKjF2xJOgZb17DN8XNPg",
    "message": {
        "html": "<p> Customer E-mail ID: "+ CustomerEmail + "</p><p> Customer Contact Information " + CustomerContact+"</p>",
        "text": "Testing123",
        "subject": "New User Prescription",
        "from_email": "admin@medicinebazaar.in",
        "from_name": "User Prescription",
        "to": [
            {
                "email":"genithub@gmail.com",
                "name": "Recipient Name",
                "type": "to"
            }
        ],
         "images": [
            {
                "type": "image/jpeg",
                "name": "nikhil",
                "content": imageData
            }
        ]
}
};

     let options = new RequestOptions({
      headers: requestHeaders
    });    
     let body = JSON.stringify(this.data);
     console.log("stringify object",body);console.log("array data",this.data);
        return this.http.post("https://mandrillapp.com/api/1.0/messages/send.json",body,options)
        .map(res => res.json());
    
  
  
  
}

}