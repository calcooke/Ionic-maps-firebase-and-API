import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the InformationCardComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'information-card',
  templateUrl: 'information-card.html'
})
export class InformationCardComponent {

  text: string;
  title: string;
  showData:boolean = false;

  constructor() {
    console.log('Hello InformationCardComponent Component');
    this.text = 'Hello World';
    //this.title = this.navParams.get('text');
  }

  



}
