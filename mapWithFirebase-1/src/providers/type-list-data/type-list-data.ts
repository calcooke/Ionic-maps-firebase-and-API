import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {archDataService} from '../../archData.service';


@Injectable()
export class TypeListDataProvider {

  items: any;

    constructor(public http: Http, private archService:archDataService) {

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

      // console.log('Set filter triggering function in service');
      // console.log('Search term is');
      // console.log(searchTerm);


        return this.items.filter((item) => {
          console.log('Filter should have worked');
            return item.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });     

      

    }

}