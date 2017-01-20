import { Component } from '@angular/core';
 
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';  
import {MailSend} from '../../providers/mail-send';
import {Camera} from 'ionic-native';
import { Platform, ActionSheetController } from 'ionic-angular';
import { NavController} from 'ionic-angular';
import {SearchPage} from '../search/search'; 
import { Storage } from '@ionic/storage';   
import {CartPage} from '../cart/cart';     
import { EmailComposer } from 'ionic-native';
import {AlertController} from 'ionic-angular';
import { File,Transfer } from 'ionic-native';
import { Cloudinary } from 'cloudinary-core';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
//declare var cordova: any;
//const fs:string = cordova.file.dataDirectory;
@Component({

  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[MailSend]
    
})
export class HomePage {

 
  searchPage = SearchPage;
    public base64Image: string;
private imageSrc: string;
 public productCount: any = 0;
 public mailResponse:any;
 public file:any;
 public galleryError:any; 
 public base64:any;
  constructor(public alertCtrl:AlertController,public mailSend:MailSend,public http: Http,public platform: Platform, public actionsheetCtrl: ActionSheetController, public navCtrl: NavController, public storage: Storage) {
      
    
    
      this.storage.get('productCount').then((val)=>{
        if(!val){
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = 0;
        }
        else{
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = val;
        }
           
         
      });
    
  
  }
  alertCameraImageSend(base64,imageData)
  {
    let alert = this.alertCtrl.create({
    title: 'Camera Alert',
    subTitle: base64+imageData,
    buttons: ['Dismiss']
  });
  alert.present();
  }

  alertGalleryImageSend(base64,imageData)
  {
    /*
    File.readAsDataURL(cordova.file.applicationDirectory,imageData).then(function(success){
     this.file=success;
     
    },
    function(error)
    {
     this.galleryError=error;
     this.alertGalleryerror(error);
      
    });
    */
    let alert = this.alertCtrl.create({
    title: 'Gallery Alert',
    subTitle: this.file,
    buttons: ['Dismiss']
  });
  alert.present();
  }
  //alert Gallery error
  alertGalleryerror(err)
  {
  let alert = this.alertCtrl.create({
    title: 'Camera Alert',
    subTitle: err,
    buttons: ['Dismiss']
  });
  alert.present();
 
  }
  //camera image send
  cameraImageSend(base64,imageData)
  {
      this.alertCameraImageSend(base64,imageData);
      this.mailSend.mailSending(base64,imageData).subscribe(mailResponse => {
        this.mailResponse = mailResponse;
        console.log(this.mailResponse);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }
  //camera image send
  galleryImageSend(imageSrc,file_uri)
  {
      this.alertGalleryImageSend(imageSrc,file_uri);
      this.mailSend.mailSending(imageSrc,file_uri).subscribe(mailResponse => {
        this.mailResponse = mailResponse;
        console.log(this.mailResponse);
      },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }
navSearch(){
    
    this.navCtrl.push(this.searchPage);
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
      // imageData from camera is a base64 encoded string 
        this.base64Image = "data:image/jpeg;base64," + imageData;
        this.cameraImageSend(this.base64Image,imageData);
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
   //imageSrc from gallery image
  Camera.getPicture(cameraOptions)
    .then((file_uri) => {this.imageSrc = file_uri;
           alert(this.imageSrc.split('/').pop());
          alert("file location"+this.imageSrc);
          this.fileTransfer(this.imageSrc);

         
          /*
        this.galleryImageSend(this.imageSrc,);
        */
    }, 
    err => console.log(err)); 
          }
        }
        
      ]
    });
    actionSheet.present();
}
 fileTransfer(imageSrc)
 {
   alert("file transfer working");
   /*
 Cloudinary.v2.uploader.unsigned_upload(imageSrc, "cmoxms3e", 
    { cloud_name: "dtkd8f03m" }, 
    function(error, result) {alert(result) });
  
  */
   let filename = imageSrc.split('/').pop();
    let options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { 'title': "postTitle", 'description': "desc" },
      upload_preset:"cmoxms3e"
    };
 
 
    const fileTransfer = new Transfer();
 
    fileTransfer.upload(imageSrc, 'https://api.cloudinary.com/v1_1/dtkd8f03m/image/upload',
      options,true).then((entry) => {
             alert(entry);        
      }, (err) => {
        alert(JSON.stringify(err));
      });

  alert("finish working");
  }
 

checkCart(){
    
    this.navCtrl.push(CartPage);
}

ionViewDidEnter(){
    this.storage.get('productCount').then((val)=>{
        if(!val){
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = 0;
        }
        else{
            console.log('this.ProductCoitasd', this.productCount);
            this.productCount = val;
        }
            
         
      });
}

}
    
  

