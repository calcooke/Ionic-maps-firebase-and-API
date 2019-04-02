import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {MonumentCommentProvider} from '../../providers/monument-comment/monument-comment';

/**
 * Generated class for the AddReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {

  public addReviewForm: FormGroup;
  paramData:any = [];

  constructor(public navCtrl: NavController, private monumentCommentService: MonumentCommentProvider, public alertCtrl: AlertController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.addReviewForm = formBuilder.group({
      comment: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z ]*'), Validators.required])]
    });

    this.paramData = navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddReviewPage');
  }

  public addNewItem() {
    
    let comment = this.addReviewForm.value.comment;

    
    if(this.addReviewForm.valid){
      
      this.showConfirm(comment);
    }

  }

  showConfirm(comment) {
    const confirm = this.alertCtrl.create({
      
      title: 'Comment added',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked');
            this.monumentCommentService.addReview(comment, this.paramData);
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

}
