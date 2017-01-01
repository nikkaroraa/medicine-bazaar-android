import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';  
import { Platform, ActionSheetController } from 'ionic-angular';   
import {Camera} from 'ionic-native'; 
import { Woocommerce } from '../../providers/woocommerce';         
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public base64Image: string;
  private imageSrc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, public actionsheetCtrl: ActionSheetController) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  
  
  openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Choose an option to upload',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            console.log('Camera option selected');
            Camera.getPicture({
                destinationType: Camera.DestinationType.DATA_URL,
                targetWidth: 1000,
                targetHeight: 1000
            }).then((imageData) => {
                // imageData is a base64 encoded string
                this.base64Image = "data:image/jpeg;base64," + imageData;
            }, (err) => {
                console.log(err);
            });
          }
        },
        {
          text: 'Gallery',
          icon: !this.platform.is('ios') ? 'gallery' : null,
          handler: () => {
            console.log('Gallery option selected');
              let cameraOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,      
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: Camera.EncodingType.JPEG,      
    correctOrientation: true
  }

  Camera.getPicture(cameraOptions)
    .then(file_uri => this.imageSrc = file_uri, 
    err => console.log(err));
              
          }
        }
      ]
    });
    actionSheet.present();
}    
  
}
