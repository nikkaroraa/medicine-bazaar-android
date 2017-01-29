import { Component } from '@angular/core';
import { NavController, NavParams, ModalController,LoadingController  } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import firebase from 'firebase';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {SigninModalPage} from '../signin-modal/signin-modal';

/*
  Generated class for the UpdateAccountInfo page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-update-account-info',
  templateUrl: 'update-account-info.html'
})
export class UpdateAccountInfoPage {
  userProfile: any;
  user : any;
  updatePasswordForm: FormGroup;
  submitAttempt: boolean = false;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage: Storage, public formBuilder: FormBuilder,
  	public modalCtrl: ModalController, public loadingCtrl: LoadingController) {

 this.userProfile = firebase.database().ref('/userProfile');
      console.log("UserProfile is: ", this.userProfile);
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

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateAccountInfoPage');
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
  				   that.loading = that.loadingCtrl.create({
				      
				    
				      content: 'Password Updated Successfully!'
				      
				    });
				    
				    that.loading.present();

				    setTimeout(() => {
				      that.loading.dismiss();
				     that.navCtrl.pop();
				    }, 1000);
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

}
 