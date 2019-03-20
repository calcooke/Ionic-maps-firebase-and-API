import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IonicSelectableComponent} from 'ionic-selectable';
import {TypeListDataProvider} from '../../providers/type-list-data/type-list-data';

import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';



@IonicPage()
@Component({
  selector: 'page-type-filter',
  templateUrl: 'type-filter.html',
})
export class TypeFilterPage {

  @ViewChild('typeSelection') selectComponent: IonicSelectableComponent;

 searchItem: string = '';
 items: any;
 searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public typeListService:TypeListDataProvider) {
    
    this.searchControl = new FormControl();

  }

  ionViewDidLoad() {
    
    this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search =>{

      this.setFilteredItems();

    })
    
  }

  setFilteredItems(){

    console.log('Set filter working');

    this.items = this.typeListService.filterItems(this.searchItem);

    console.log('Items returned');
    console.log(this.items);

  }

}
