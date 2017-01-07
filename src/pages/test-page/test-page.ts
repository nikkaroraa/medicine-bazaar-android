import { Component } from '@angular/core';



import {PeopleService} from '../../providers/people-service';
/*
  Generated class for the TestPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-test-page',
  templateUrl: 'test-page.html',
providers:[PeopleService]
})
export class TestPagePage {

  public products:any = [];
  private start:number=0;
  
  constructor(public peopleService:PeopleService) {
    
    this.loadProduct();
console.log('Products are:::' + this.products)
  }
  
  loadProduct() {
    
    return new Promise(resolve => {
      
      this.peopleService.load(this.start)
      .then(data => {
        
        
          this.products= data;
        
        
        resolve(true);
        
      });
            
    });

  }
  
  doInfinite(infiniteScroll:any) {
     console.log('doInfinite, start is currently '+this.start);
     this.start+=50;
     
     this.loadProduct().then(()=>{
       infiniteScroll.complete();
     });
     
  }

}
