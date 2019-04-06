import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import {TypeFilterPage} from '../../pages/type-filter/type-filter';
import {LocationFilterPage} from '../../pages/location-filter/location-filter';
import {FavouriteFilterPage} from '../../pages/favourite-filter/favourite-filter';
import {ReviewedFilterPage} from '../../pages/reviewed-filter/reviewed-filter';
//import {HomePage} from '../home/home';


@IonicPage()
@Component({
  selector: 'page-filter-menu',
  templateUrl: 'filter-menu.html',
})
export class FilterMenuPage {

  tab1Root = TypeFilterPage;
  tab2Root = LocationFilterPage;
  tab3Root = FavouriteFilterPage;
  tab4Root = ReviewedFilterPage;

  

  constructor(public navCtrl: NavController, public navParams: NavParams, public events:Events) {

    events.subscribe('items:selected', () => {
      console.log("Recieved the message to pop to root")
      //this.navCtrl.setRoot(HomePage);
      this.navCtrl.popToRoot();
    });
    //this.navCtrl.setRoot(HomePage);

  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FilterMenuPage');
    
  }

}
