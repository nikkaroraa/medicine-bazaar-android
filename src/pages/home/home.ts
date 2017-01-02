import { Component } from '@angular/core';
 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  
import { FetchProducts } from '../../providers/fetch-products.service';
import {Camera} from 'ionic-native';
import { Platform, ActionSheetController } from 'ionic-angular';
         
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({

  selector: 'page-home',
  templateUrl: 'home.html',
    providers: [ FetchProducts ]
})
export class HomePage {
 
  public products: any;
    public base64Image: string;
private imageSrc: string;
 
  constructor(public http: Http, public fetchProducts: FetchProducts, public platform: Platform, public actionsheetCtrl: ActionSheetController) {
      
    this.loadProducts();
  
  }
loadProducts(){
  this.fetchProducts.load()
  .then(data => {
    this.products = data;
  });
}

openMenu() {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Choose an option to upload',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Camera',
          
          icon: 'camera',
          handler: () => {
            console.log('Camera clicked');
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
          icon: 'images',
          handler: () => {
            console.log('Gallery Clicked');
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
    
  

