import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';
import {archDataService} from '../../archData.service';

/**
 * Generated class for the MonumentModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-monument-modal',
  templateUrl: 'monument-modal.html',
})
export class MonumentModalPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private archService:archDataService) {
  }

  monumentTitle: any;
  monumentId:any;
  monumentDescription:any;

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
    
  }

  public closeModal(){

    this.viewCtrl.dismiss();
    console.log('Modal closed');
  }

}