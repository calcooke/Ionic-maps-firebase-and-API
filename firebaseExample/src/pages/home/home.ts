import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public afd: AngularFireDatabase) {

    this.getDataFromFirebase();

  }

  getDataFromFirebase(){

    console.log('Begining retrieve');
    this.afd.list('/Heros/').valueChanges().subscribe(
      data => {
        console.log(JSON.stringify(data));
      }
    )
    console.log('Retrieved');

  }

}
