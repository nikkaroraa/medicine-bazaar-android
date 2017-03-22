import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GetCategory } from '../../providers/get-category';
import { SearchCategoryPage } from '../search-category/search-category';
/*
  Generated class for the TestCategory page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-category',
  templateUrl: 'test-category.html',
  providers: [GetCategory]
})
export class TestCategoryPage {

public categories: Array<any> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public getCategory: GetCategory) {

  	getCategory.getAllCategories().subscribe(data => {
	    console.log("this.categories: ", data);
      this.categories = data;
    },
        err => {
        console.log(err);
    },
        () => {
        console.log('Completed');
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TestCategoryPage');
  }

    categorySelected(category){
      console.log('Category Selected is: ', category.id);
      this.navCtrl.push(SearchCategoryPage, {
       categoryID: category.slug
     });
        
    }


}
