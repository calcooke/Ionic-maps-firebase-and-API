import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IonicSelectableComponent} from 'ionic-selectable';
import {TypeListDataProvider} from '../../providers/type-list-data/type-list-data';

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

 searchItem: string = '';
 items: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public typeListService:TypeListDataProvider) {
    
  }

  ionViewDidLoad() {
    
    this.setFilteredItems();

  }

  setFilteredItems(){

    console.log('Set filter working');

    this.items = this.typeListService.filterItems(this.searchItem);

  }

}
