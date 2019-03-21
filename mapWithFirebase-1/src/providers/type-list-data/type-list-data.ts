import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {archDataService} from '../../archData.service';
import { Observable } from 'rxjs';



@Injectable()
export class TypeListDataProvider {

  itemsRetrieved:boolean = false;
  items: any;
  
    constructor(public http: Http, private archService:archDataService) {

      this.archService.getData().subscribe(result => {
        console.log('Retrieved data from archService');
        console.log(result);
        this.items = result;
        console.log('Assigned result items is now');
        console.log(this.items);
        this.itemsRetrieved = true;
        
      })

      console.log('CALLING FROM CONSTRUCTOR AFTER RETRIEVING DATA')
      console.log(this.items);

    }

    filterItems(searchTerm){

      console.log('Filter function already running');

        return this.items.filter((item) => {
          return item.CLASSDESC.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

        // return this.items.filter((item) => {
        //     return item.CLASSDESC.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        // });     

    }

    

}