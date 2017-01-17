import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {SigninModalPage} from '../signin-modal/signin-modal';

@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html'
})
export class ItemDetailsPage {
  userProfile: any;
  user : any;
  updatePasswordForm: FormGroup;
  submitAttempt: boolean = false;
  emailVerified: any = false;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public formBuilder: FormBuilder,
  	public modalCtrl: ModalController) {
    // If we navigated to this page, we will have an item available as a nav param
      this.userProfile = firebase.database().ref('/userProfile');
      console.log("UserProfile is: ", this.userProfile);
      this.userProfile.child('Yhf2kL1w0rh8MM6S72T6qqFbfLt1').set({gender: 'Female'});

      if(firebase.auth().currentUser){
      this.user = firebase.auth().currentUser;
      }
      else{
        this.user = {};
      }
      console.log("this.user ", this.user);
      this.updatePasswordForm = formBuilder.group({
        	password: ['',  Validators.compose([Validators.maxLength(30), Validators.required])]
    	});

      this.emailVerified = this.user.emailVerified;
  }

	updatePassword(){
		this.submitAttempt = true;
    var that = this;
		if(!this.updatePasswordForm.valid){
         	console.log("Form not valid");
    	} 
    
    	else 
    	{
	        console.log("Success! Form is valid. Continuing....")
	        console.log(this.updatePasswordForm.value);
        	this.user.updatePassword(this.updatePasswordForm.value.password).then(function() {
  				  // Update successful.
  				  console.log("Password Updated Successfully");
				  }, function(error) {
  				  // An error happened.
  				  console.log("Error in Password Updation. Please try again", error);
  				  let signinModal = that.modalCtrl.create(SigninModalPage);
  				  signinModal.present();
  				  //recent sign in required
				});

    	}	
	}

  sendVerificationMail(){
    this.user.sendEmailVerification().then(function() {
      console.log("Email sent successfully");
    }, function(error) {
      console.log("Email sending failed");
    });

  }


}
