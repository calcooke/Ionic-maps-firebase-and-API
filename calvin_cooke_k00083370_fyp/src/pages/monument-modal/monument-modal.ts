import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {archDataService} from '../../archData.service';
import { AddReviewPage } from '../add-review/add-review';
import {MonumentReviewProvider} from '../../providers/monument-review/monument-review';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';
import {LoginPage} from '../login/login';
import {EditReviewPage} from '../edit-review/edit-review';



@IonicPage()
@Component({
  selector: 'page-monument-modal',
  templateUrl: 'monument-modal.html',
})
export class MonumentModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public viewCtrl: ViewController, private archService:archDataService, 
    private reviewService:MonumentReviewProvider, private authSerivce:AuthServiceProvider) {
      
    console.log("The modal's constructor is called");
  }

  monumentTitle: any;
  monumentId:any;
  monumentDescription:any;
  monumentReviews:any = [];
  monumentComments:any = [];

  ionViewDidLoad() {
    
    console.log("The modal page has loaded"); 

    console.log("Now going to get the data from the nav params")

    console.log(this.navParams.get('message'));
    this.monumentTitle = this.navParams.get('message');
    this.monumentId = this.navParams.get('id');

    // Retrieving the description for the ArcGIS service

    this.archService.retrieveDescription(this.navParams.get('id')).subscribe(result => {

      this.monumentDescription = result.features[0].attributes.WEBNOTES;

    })

    // Getting all the monuments reviews from Firebase

    this.reviewService.getReview(this.monumentId.toLowerCase())
        .subscribe(docs => {
        
          if (docs.payload.exists)
          {
            this.monumentReviews= docs.payload.data();
          }
    
      });    

  }


  public closeModal(){

    this.viewCtrl.dismiss();
    console.log('Modal closed');
  }

  public addReview(){

    // A user can only add a review if they are logged in.

    if(this.authSerivce.isLoggedIn == true){

      console.log('Opening the add review page and the Id being passed is');
      console.log(this.monumentId.toLowerCase());

      this.navCtrl.push(AddReviewPage,{
        
        id: this.monumentId.toLowerCase()
        
      });

    } else {

      // If a user isn't logged in - bring them to the login page

      this.navCtrl.push(LoginPage,{
        
        id: this.monumentId.toLowerCase()
        
      });

    }

  };

  // Creating an object from the current user's review.
  // The edit button will only appear on a review that matches
  // the current user's Id, as it is binded 
  // in the html with with *ngIf="review.userId == authSerivce.currentUserid"

  public editReview(review ){

    this.navCtrl.push(EditReviewPage,{
      comment: review.comment,
      rating: review.rating,
      id: this.monumentId.toLowerCase()
    });

  }

}