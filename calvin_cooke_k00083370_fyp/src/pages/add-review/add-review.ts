import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from 'ionic-angular';
import {MonumentReviewProvider} from '../../providers/monument-review/monument-review';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-add-review',
  templateUrl: 'add-review.html',
})
export class AddReviewPage {

  public addReviewForm: FormGroup;
  paramData:any = [];
  

  constructor(public navCtrl: NavController, private reviewService: MonumentReviewProvider, public alertCtrl: AlertController, public navParams: NavParams, public formBuilder: FormBuilder, private auth: AuthServiceProvider) {

    //Creating a form group and seting the validators for each

    this.addReviewForm = formBuilder.group({
      comment: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      rating: ['', Validators.required],
      
    });

    this.paramData = navParams.data;

  }

  ionViewDidLoad() {

    // checking if the ID arrived on this page and is correct
    
    console.log("The monument ID passed to the Add Review page is");
    console.log(this.navParams.data);
  }

  public addNewItem() {

    // Create a review object from the form data
    
    let review = {
      comment: this.addReviewForm.value.comment,
      rating: this.addReviewForm.value.rating,
      userId: this.auth.currentUserid,
      date: Date.now()
    }


    console.log("Id being passed to service is to push to firestore is");
    console.log(this.navParams.data.id)

    if(this.addReviewForm.valid){
      
      this.showConfirm(review,this.navParams.data);
    }

  }

  showConfirm(review, id) {

    const confirm = this.alertCtrl.create({
      
      title: 'Review added',
      buttons: [
        {
          text: 'Ok',
          handler: () => {

            console.log('Ok clicked, calling addReview method in review service');

            this.reviewService.addReview(review,id );
        
            console.log("Popping back to monument modal");
          
            this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
       
          }
        }
      ]
    });
    confirm.present();
  }

}
