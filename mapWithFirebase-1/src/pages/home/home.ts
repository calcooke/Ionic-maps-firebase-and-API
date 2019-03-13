import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {ModalController} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

declare var google: any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //items;
  userLocation: string = 'Unretrieved';

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public modalCtrl: ModalController, private geolocation:Geolocation) {

    this.getDataFromFirebase();

  }

  public openModal(){

    console.log('Modal open');
    var modalPage = this.modalCtrl.create('ModalPage'); 
    console.log('Presenting modal');
    modalPage.present();

  }

  getDataFromFirebase(){

    //console.log('Begining firebase retrieve');
    this.afd.list('/Heros/').valueChanges().subscribe(
      data => {
        console.log(JSON.stringify(data));
        //this.items = data;
      }
    )
    //console.log('Retrieved data from firebase');

  }

  locate(){

    console.log('LOCATION CALLED');

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.userLocation = 'Lat: ' + resp.coords.latitude + '<br/>' + ' Lng: ' + resp.coords.longitude;
     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

}