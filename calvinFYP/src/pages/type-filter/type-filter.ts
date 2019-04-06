import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

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
  monumentPopulated:boolean = false;
  typesToFilter: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public typeListProvider:TypeListDataProvider, public events:Events) {
    
    this.searchControl = new FormControl();

    events.subscribe('monuments:retrieved', (notice)=>{
      //This is to ensure that set filtered items is only called once the 
      // service has actually retrieved, stored and sorted the monument data.
      this.setFilteredItems();
      
      
    });

    events.subscribe('button:pressed', (notice)=>{
      //this.setFilteredItems();
      //console.log('Second event heard');
      
    });

  }
  
  
  ionViewDidLoad() {

    console.log(this.typeListProvider.items);

    // console.log('Boolean is');
    // console.log(this.monumentPopulated);

    if(this.typeListProvider.monumentPopulated == true){

      this.setFilteredItems();

    }

    this.events.subscribe('monuments:retrieved', (notice)=>{

      this.setFilteredItems();
       
    });

 
    this.searchControl.valueChanges.debounceTime(700).subscribe(search =>{

      this.setFilteredItems();

    })
    
  }

  setFilteredItems(){

    //console.log('Setting boolean to TRUE');
    this.monumentPopulated = true;
    //console.log(this.monumentPopulated);
    //console.log('Setting boolean to TRUE');
    this.items = this.typeListProvider.filterItems(this.searchTerm);
    this.items.sort();

  }

  addTitleToFilter(title){

  //   if (!this.typesToFilter.some((item) => item == title)) {
  //     this.typesToFilter.push(title);
  // }
  if (!this.typesToFilter.includes(title)) {
    this.typesToFilter.push(title);
  } else {
    let i = this.typesToFilter.indexOf(title);
    console.log("Index is ", i);
    this.typesToFilter.splice(i,1);
  }

    // this.typesToFilter.push(title);
     console.log(this.typesToFilter);
  }

  filterByType(){

    //This event alerts google.map.ts to set the visible value on the filtered markers
    this.events.publish('filter:type', this.typesToFilter);
    //this.navCtrl.popToRoot();
    //this.navCtrl.pop();
    //this.navCtrl.popTo(HomePage);
    //this.app.rootPage.popToRoot();
    //this.navCtrl.first();
    //this.navCtrl.setRoot(HomePage)
    //this.navCtrl.parent.popTo(HomePage);

    //The solution
    // this.navCtrl.setRoot(HomePage);
    //this.navCtrl.popToRoot();
    this.navCtrl.pop();

    this.events.publish('items:selected');
  

    console.log("should have popped");

  }

}
