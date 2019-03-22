import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TypeFilterPage} from '../../pages/type-filter/type-filter';
import {LocationFilterPage} from '../../pages/location-filter/location-filter';
import {FavouriteFilterPage} from '../../pages/favourite-filter/favourite-filter';
import {ReviewedFilterPage} from '../../pages/reviewed-filter/reviewed-filter';


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

  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad FilterMenuPage');
  }

}
