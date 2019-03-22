import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {IonicSelectableComponent} from 'ionic-selectable';
import {TypeListDataProvider} from '../../providers/type-list-data/type-list-data';

import {FormControl} from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

import {Events} from 'ionic-angular';
import { connectableObservableDescriptor } from 'rxjs/observable/ConnectableObservable';



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

  constructor(public navCtrl: NavController, public navParams: NavParams, public typeListService:TypeListDataProvider, public events:Events) {
    
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

    console.log(this.typeListService.items);

    // console.log('Boolean is');
    // console.log(this.monumentPopulated);

    if(this.typeListService.monumentPopulated == true){

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
    this.items = this.typeListService.filterItems(this.searchTerm);

  }

  logListItemTile(title){
    console.log(title)
  }

}
