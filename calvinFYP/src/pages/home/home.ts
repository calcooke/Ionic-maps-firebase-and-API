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

  //items;
  userLocation: any;
  filterActive: boolean = false;

  constructor(public navCtrl: NavController,public navParams: NavParams, public platform: Platform, public afd: AngularFireDatabase, public modalCtrl: ModalController, public events:Events) {

    
    this.getDataFromFirebase();
    console.log("HOW OFTEN DOES A CONSTRUCTOR LOAD?");

    events.subscribe('filter:active', (types)=>{
      
      this.filterActive = true;
      console.log("filterActive boolean is ", this.filterActive);
      
      
    });


    events.subscribe('filter:inactive', (types)=>{
      
      this.filterActive = false;
      console.log("filterActive boolean is ", this.filterActive);
     
      
    });
    //this.locate();

    // this.platform.ready().then(()=>{

    //   //set options.. 
    //   var options = {
    //              timeout: 2000 //sorry I use this much milliseconds
    //          }
    //   //use the geolocation 
    //   this.geolocation.getCurrentPosition(options).then(data=>{
    //     console.log( data.coords.longitude);
    //     console.log(data.coords.latitude);
    //    }).catch((err)=>{
    //        console.log("Error", err);
    //      });
    //   });

  }

  ionViewDidLoad() {

    console.log(this.navParams.data);
    console.log("HOW OFTEN DOES IONVIEW DID LOAD LOAD?");

    //WORKING LOCATION CODE

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   console.log(resp.coords.latitude);
    //   console.log(resp.coords.longitude);
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });
    
  }

  public openFilter(){

    console.log('working');

    this.navCtrl.push(FilterMenuPage);

  }

  public openModal(){

    //console.log('Modal open');
    var modalPage = this.modalCtrl.create('ModalPage'); 
    //console.log('Presenting modal');
    modalPage.present();

  }

  public clearFilter(){
    //console.log('CLEAR FILTER');
    this.events.publish('clear:filters');
    //this.filterActive = false;
  }

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

  getLocation(){

    console.log('LOCATION CALLED');

    //return this.geolocation.getCurrentPosition();

    // this.geolocation.getCurrentPosition().then((resp) => {
    //   // resp.coords.latitude
    //   // resp.coords.longitude
    //   console.log(resp);
    //   this.userLocation = resp.coords.latitude;
    //  }).catch((error) => {
    //    console.log('Error getting location', error);
    //  });

  }

}