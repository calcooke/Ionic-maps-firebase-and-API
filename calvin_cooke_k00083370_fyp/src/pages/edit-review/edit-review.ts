import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MonumentReviewProvider} from '../../providers/monument-review/monument-review';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the EditReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-review',
  templateUrl: 'edit-review.html',
})
export class EditReviewPage {

  public editReviewForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder, public alertCtrl: AlertController, private reviewService: MonumentReviewProvider, private auth: AuthServiceProvider) {

    this.editReviewForm = formBuilder.group({
      comment: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      rating: ['', Validators.required]
    });

  }

  ionViewDidLoad() {

    console.log(this.navParams.data);
    this.populateForm();
    
  }

  populateForm(){

    this.editReviewForm.setValue({
      comment: this.navParams.data.comment,
      rating: this.navParams.data.rating,
      
    })

  }

  public editReview() {
    

    let review = {
      comment: this.editReviewForm.value.comment,
      rating: this.editReviewForm.value.rating,
      userId: this.auth.currentUserid,
      date: Date.now()
    }

  
    console.log("Id being passed to service is to update infirestore is");
    console.log(this.navParams.data.id)

    this.reviewService.editReview(this.navParams.data.id, review)

  }

  showConfirmEdit() {
    const confirm = this.alertCtrl.create({
      title: 'Review editied',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.editReview();
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();
  }

  showConfirmDelete() {
    const confirm = this.alertCtrl.create({
      title: 'Delete review',
      message: 'Do you want to delete your review?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.reviewService.convertReviewToArray(this.navParams.data.id, this.auth.currentUserid);
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

}
