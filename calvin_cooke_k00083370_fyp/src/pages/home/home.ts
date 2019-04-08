import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {ModalController} from 'ionic-angular';

import {FilterMenuPage} from '../filter-menu/filter-menu'
import {Events} from 'ionic-angular';
import { Platform } from 'ionic-angular';


declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  
  userLocation: any;
  filterActive: boolean = false;

  constructor(public navCtrl: NavController,public navParams: NavParams, public platform: Platform, public afd: AngularFireDatabase, public modalCtrl: ModalController, public events:Events) {

    
    //this.getDataFromFirebase();

    // Listening out for an event notifying that the monument
    // filter is now ACTIVE to toggle the visibility
    // of the "clear filter" icon

    events.subscribe('filter:active', (types)=>{
      
      this.filterActive = true;
      console.log("filterActive boolean is ", this.filterActive);
        
    });

    // Listening out for an event notifying that the monument
    // filter is now INACTIVE to toggle the visibility
    // of the "clear filter" icon

    events.subscribe('filter:inactive', (types)=>{
      
      this.filterActive = false;
      console.log("filterActive boolean is ", this.filterActive);
      
    });
    

  }

  ionViewDidLoad() {

 
  }

  public openFilter(){

    console.log('Opening the filter menu page');

    this.navCtrl.push(FilterMenuPage);

  }

  // I believe this open modal function is no longer used.

  public openModal(){

    var modalPage = this.modalCtrl.create('ModalPage'); 
    
    modalPage.present();

  }

  public clearFilter(){
    
    // Publishing an event to notify that the clear filter button has been pressed
    this.events.publish('clear:filters');
    
  }

  // This function was used to get data from FireBase's "Real time database".
  // I have since moved on to FireStore.

  getDataFromFirebase(){

    //console.log('Begining firebase retrieve');
    // this.afd.list('/Heros/').valueChanges().subscribe(
    //   data => {
    //     console.log(JSON.stringify(data));
    //     //this.items = data;
    //   }
    // )
    //console.log('Retrieved data from firebase');

  }

  

}