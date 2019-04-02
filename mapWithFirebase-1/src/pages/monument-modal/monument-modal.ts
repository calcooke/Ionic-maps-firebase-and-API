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
  monumentReview:any = [];

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

  this.monumentService.getReview()
      .subscribe(docs => {
        //console.log(docs);
        this.monumentReview =  docs.map(item => {
          return {
            id:  item.payload.doc.id,
            ...item.payload.doc.data()
          };
        }); 
        console.log(this.monumentReview);
        console.log(this.monumentReview[0].atmosphere);
      });    




  }



  public closeModal(){

    this.viewCtrl.dismiss();
    console.log('Modal closed');
  }

  public addReview(){

    console.log('Pushing page');
    this.navCtrl.push(AddReviewPage,{
      
    });

  };

}