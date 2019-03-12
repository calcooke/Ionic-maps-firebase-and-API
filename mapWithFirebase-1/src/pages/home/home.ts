import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';
import {ModalController} from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  //items;

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase, public modalCtrl: ModalController) {

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

}