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
  //firstLogin: boolean = true;

  constructor(public navCtrl: NavController, private monumentCommentService: MonumentCommentProvider, public alertCtrl: AlertController, public navParams: NavParams, public formBuilder: FormBuilder) {

    this.addReviewForm = formBuilder.group({
      comment: ['', Validators.compose([Validators.maxLength(140), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      rating: ['', Validators.required],
      userId: ['', Validators.required]
    });

    this.paramData = navParams.data;

  }

  ionViewDidLoad() {
    console.log("The data passed to the Add Review page is");
    console.log(this.navParams.data);
  }

  public addNewItem() {
    
    // let review = [{
    //   comment: this.addReviewForm.value.comment,
    //   rating: this.addReviewForm.value.rating,
    //   userId: this.addReviewForm.value.userId
    // }]

    let review = {
      comment: this.addReviewForm.value.comment,
      rating: this.addReviewForm.value.rating,
      userId: this.addReviewForm.value.userId
    }

    //let id:any = this.navParams.data;

    console.log("Id being passed to service is to push to firestore is");
    console.log(this.navParams.data.id)

    if(this.addReviewForm.valid){
      
      //this.showConfirm(review,id);
      this.showConfirm(review,this.navParams.data);
    }

  }

  showConfirm(review, id) {
    const confirm = this.alertCtrl.create({
      
      title: 'Comment added',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            console.log('Ok clicked, calling addReview method in review service');
            this.monumentCommentService.addReview(review,id );
            //this.navCtrl.pop();
            //this.navCtrl.popToRoot();
            //this.navCtrl.popTo('MonumentModalPage')
            //this.navCtrl.popTo(MonumentModalPage)
            console.log("Popping back to monument modal");
            //console.log("Is this the first login?", this.firstLogin);

            this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));

            // if(this.firstLogin == true){

            //   this.firstLogin = false;
            //   this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length()-3));
              
            // } else {
            //   this.navCtrl.pop();
            // };

        
          }
        }
      ]
    });
    confirm.present();
  }

}
