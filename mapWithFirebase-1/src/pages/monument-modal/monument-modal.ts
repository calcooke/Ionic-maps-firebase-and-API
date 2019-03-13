import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ViewController} from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  }

  monumentTitle: any;

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ModalPage');
    console.log(this.navParams.get('message'));
    this.monumentTitle = this.navParams.get('message');
  }

  public closeModal(){

    this.viewCtrl.dismiss();
    console.log('Modal closed');
  }

}