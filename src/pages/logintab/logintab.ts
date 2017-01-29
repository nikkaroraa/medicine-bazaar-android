
import { 
  NavController, 
  LoadingController, 
  AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthData } from '../../providers/auth-data';
import { SignuptabPage } from '../signuptab/signuptab';

import { ResetPasswordPage } from '../reset-password/reset-password';
import { EmailValidator } from '../../validators/email';
import { CheckoutPage } from '../checkout/checkout';


/*
  Generated class for the Logintab page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-logintab',
  templateUrl: 'logintab.html'
})
export class LogintabPage {

 public loginForm;
  emailChanged: boolean = false;
  passwordChanged: boolean = false;
  submitAttempt: boolean = false;
  loading: any;

  constructor(public nav: NavController, public authData: AuthData, 
    public formBuilder: FormBuilder, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController) {

    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
    });
  }

  elementChanged(input){
    let field = input.inputControl.name;
    this[field + "Changed"] = true;
  }

  loginUser(){

    this.submitAttempt = true;

    if (!this.loginForm.valid){
      console.log(this.loginForm.value);
    } else {
      this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password).then( authData => {
        //this.nav.setRoot(HomePage);
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();          
        });
      });

      
this.loading = this.loadingCtrl.create({
    content: 'Loading Please Wait...'
  });

  this.loading.present();

  setTimeout(() => {
   this.nav.push(CheckoutPage);
  }, 1000);

  setTimeout(() => {
    this.loading.dismiss();
  }, 5000);
console.log("Helloo");
    }
  }

  goToSignup(){
    this.nav.push(SignuptabPage);
  }

  goToResetPassword(){
    this.nav.push(ResetPasswordPage);

  }

}
