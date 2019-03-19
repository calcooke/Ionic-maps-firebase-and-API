import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IonicSelectableComponent} from 'ionic-selectable';

/**
 * Generated class for the TypeFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-type-filter',
  templateUrl: 'type-filter.html',
})
export class TypeFilterPage {

  @ViewChild('typeSelection') selectComponent: IonicSelectableComponent;

  monumentIds = [];
  user = null;
  userIds = [];

  users = [
    {
      id: 0,
      name: 'Simon Grimm',
      country: 'Germany'
    },
    {
      id: 1,
      name: 'Jimmy Grimm',
      country: 'Ireland'
    },
    {
      id: 3,
      name: 'Tommy Grimm',
      country: 'Japan'
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TypeFilterPage');
    this.selectComponent.open();
  }



}
