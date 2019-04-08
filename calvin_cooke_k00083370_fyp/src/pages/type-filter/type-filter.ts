import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import {IonicSelectableComponent} from 'ionic-selectable';
import {TypeListDataProvider} from '../../providers/type-list-data/type-list-data';

import {FormControl} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';

import { App } from 'ionic-angular';

import { ToastController } from 'ionic-angular';




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
  monumentPopulated:boolean = false;
  typesToFilter: any = [];

  constructor(public navCtrl: NavController,public appCtrl:App, public navParams: NavParams, public typeListProvider:TypeListDataProvider, public events:Events, public toastController: ToastController) {
    
    this.searchControl = new FormControl();

    events.subscribe('monuments:retrieved', (notice)=>{
      //This is to ensure that set filtered items is only called once the 
      // service has actually retrieved, stored and sorted the monument data.
      //It listenes out for the event that announces when it has happened.

      this.setFilteredItems();
      
      
    });

    
    events.subscribe('button:pressed', (notice)=>{

      // This was an event for testing
      
    });

  }
  
  
  ionViewDidLoad() {

    console.log(this.typeListProvider.items);



    if(this.typeListProvider.monumentPopulated == true){

      this.setFilteredItems();

    }

    this.events.subscribe('monuments:retrieved', (notice)=>{

      this.setFilteredItems();
       
    });

 
    // This listens out for any value changes in the search bar
    // wait for 700ms and then calls the set filter items
    // to filter the list of items by the value currently in the
    // input field.

    this.searchControl.valueChanges.debounceTime(700).subscribe(search =>{

      this.setFilteredItems();

    })
    
  }

  setFilteredItems(){

    this.monumentPopulated = true;
    
    //Items is an array being returned from the typeList provider.
    // the array is filtered based on whatever the user has typed into
    // the input field. Such as if the user types in "ra", the list will
    // be populated by items which include that such as "rath"

    this.items = this.typeListProvider.filterItems(this.searchTerm);
    this.items.sort();

  }

  addTitleToFilter(title){

  // Once you click on an list item, add it to an array
  // so we know what to filter  the monuments by.
 
  if (!this.typesToFilter.includes(title)) {

    this.typesToFilter.push(title);

  } else {

    let i = this.typesToFilter.indexOf(title);
    console.log("Index is ", i);
    this.typesToFilter.splice(i,1);
  }

     console.log(this.typesToFilter);
  }

  filterByType(){

    //This function will only work if the array of
    // items to filter is greater than one, as in
    // if the user has selected an item first.

    if(this.typesToFilter.length > 0){
    //This event alerts google.map.ts to set the visible value on the filtered markers
    this.events.publish('filter:type', this.typesToFilter);
    this.events.publish('filter:active'); 
    this.appCtrl.getRootNav().pop();

    } else {
      this.presentToast();
    }

  }

  //Alerting the user to select an item before filtering

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Please select an item',
      duration: 600
    });
    toast.present();
  }

}
