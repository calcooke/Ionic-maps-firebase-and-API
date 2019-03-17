import { Component } from '@angular/core';
import {TypeFilterPage} from '../../pages/type-filter/type-filter';


/**
 * Generated class for the SearchTabsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'search-tabs',
  templateUrl: 'search-tabs.html'
})
export class SearchTabsComponent {

  text: string;

  tab1Root = TypeFilterPage;

  constructor() {
    console.log('Hello SearchTabsComponent Component');
    this.text = 'Hello World';
  }

}
