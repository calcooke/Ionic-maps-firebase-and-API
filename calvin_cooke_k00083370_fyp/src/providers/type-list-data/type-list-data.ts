import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {archDataService} from '../../archData.service';

import {Events} from 'ionic-angular';



@Injectable()
export class TypeListDataProvider {

  monumentPopulated:boolean = false;

  items: any = [];
  
    constructor(public http: Http, private archService:archDataService, public events:Events) {

      //Creating an array of all monument retrieved from the database
      // and removing the duplicates for displaying in the filter lists.

      this.archService.getData().subscribe(result => {
                
        let tempArray=[];

        for(let i = 0; i < result.length; i++ ){
          tempArray.push(result[i]['CLASSDESC']);
        }
        
        this.removeDuplicates(tempArray);
            
      }); 

    }

    removeDuplicates(duplicateArray){

        let unique_array = duplicateArray.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });

        this.items = unique_array;
        let notice = "Array assigned";
      
        this.events.publish('monuments:retrieved', notice);
      
    };

    
    filterItems(searchTerm){

      // the "search term" being passed in refers to
      // the value in the input field of the list of 
      // monument types to filter by.

      //It works by returning an array of items only with the
      // value of the input field within it.

      // For example, if the input field is blank ' '
      // The entire array is returned and displayed in the list.

      // If the user types in "Cas", it will only return items of the array that include
      // the term - such as "Castle"

      this.monumentPopulated = true;

      let notice ="button pressed";
      this.events.publish('button:pressed', notice);

        return this.items.filter((item) => {
          return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

    }

    

}