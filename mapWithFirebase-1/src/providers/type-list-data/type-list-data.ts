import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the TypeListDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TypeListDataProvider {

  items: any;

    constructor(public http: Http) {

        this.items = [
            {title: 'one'},
            {title: 'two'},
            {title: 'three'},
            {title: 'four'},
            {title: 'five'},
            {title: 'six'}
        ]

    }

    filterItems(searchTerm){

      console.log('Set filter triggering function in service');

        return this.items.filter((item) => {
          console.log('Filter should have worked');
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     

        //

    }

}