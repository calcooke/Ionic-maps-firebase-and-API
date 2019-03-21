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

  searchTerm: string = '';
 items: any;
 searchControl: FormControl;

  constructor(public navCtrl: NavController, public navParams: NavParams, public typeListService:TypeListDataProvider) {
    
    //this.typeListService.retrieveData();
    this.searchControl = new FormControl();

  }
  
  
  ionViewDidLoad() {

    //this.typeListService.retrieveData();

    console.log('Type filter TS file loaded');
    console.log('Checking the items retrieved boolean');
    
    console.log(this.typeListService.itemsRetrieved);

    //this.setFilteredItems();

    this.searchControl.valueChanges.debounceTime(700).subscribe(search =>{

      this.setFilteredItems();

    })
    
  }

  setFilteredItems(){

    // console.log('Set filter triggering in TS file');
    // console.log(this.searchTerm);

    this.items = this.typeListService.filterItems(this.searchTerm);

    // console.log('Items returned');
    //console.log(this.items);

  }

}
