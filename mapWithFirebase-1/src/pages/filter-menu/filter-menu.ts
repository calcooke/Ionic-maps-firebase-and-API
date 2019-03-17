import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {TypeFilterPage} from '../../pages/type-filter/type-filter';
import {LocationFilterPage} from '../../pages/location-filter/location-filter';
import {FavouriteFilterPage} from '../../pages/favourite-filter/favourite-filter';
import {ReviewedFilterPage} from '../../pages/reviewed-filter/reviewed-filter';

/**
 * Generated class for the FilterMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    console.log('ionViewDidLoad FilterMenuPage');
  }

  // tab1Root = HomePage;
  // tab2Root = AboutPage;
  // tab3Root = ContactPage;

}
