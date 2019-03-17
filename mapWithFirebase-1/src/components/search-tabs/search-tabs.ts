import { Component } from '@angular/core';

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

  constructor() {
    console.log('Hello SearchTabsComponent Component');
    this.text = 'Hello World';
  }

}
