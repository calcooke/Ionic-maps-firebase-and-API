import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public formBuilder: FormBuilder) {

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

}
