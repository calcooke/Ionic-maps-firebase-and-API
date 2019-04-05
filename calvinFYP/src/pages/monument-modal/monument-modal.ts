import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {archDataService} from '../../archData.service';
import { AddReviewPage } from '../add-review/add-review';
import {MonumentCommentProvider} from '../../providers/monument-comment/monument-comment';



@IonicPage()
@Component({
  selector: 'page-monument-modal',
  templateUrl: 'monument-modal.html',
})
export class MonumentModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private archService:archDataService, private monumentService:MonumentCommentProvider) {
  }

  monumentTitle: any;
  monumentId:any;
  monumentDescription:any;
  monumentReviews:any = [];
  monumentComments:any = [];

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ModalPage');
    console.log(this.navParams.get('message'));
    this.monumentTitle = this.navParams.get('message');
    this.monumentId = this.navParams.get('id');
    //this.archService.retrieveDescription(this.navParams.get('id'));

    this.archService.retrieveDescription(this.navParams.get('id')).subscribe(result => {
      //console.log(result);
      this.monumentDescription = result.features[0].attributes.WEBNOTES;
      })



  this.monumentService.getReview(this.monumentId.toLowerCase())
      .subscribe(docs => {
       
        if (docs.payload.exists)
        {
          this.monumentReviews= docs.payload.data();
        }
        // console.log("This is monumentReviews");
        // console.log(this.monumentReviews);
        // console.log("This is the rating");
        //console.log(this.monumentReviews.comments['rating']);
        
        
    
          // this.monumentReviews =  docs.map(item => {
          //     return {
          //       id:  item.payload.doc.id,
          //       ...item.payload.doc.data()
          //     };
          // }); 
          
        
      
      });    

  }



  public closeModal(){

    this.viewCtrl.dismiss();
    console.log('Modal closed');
  }

  public addReview(){

    console.log('Opening the add review page and the Id being passed is');
    console.log(this.monumentId.toLowerCase());
    this.navCtrl.push(AddReviewPage,{
      
      id: this.monumentId.toLowerCase()
      
    });

  };

}