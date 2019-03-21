import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {archDataService} from '../../archData.service';
import { Observable } from 'rxjs';



@Injectable()
export class TypeListDataProvider {

  items: any = [];
  
    constructor(public http: Http, private archService:archDataService) {

      this.archService.getData().subscribe(result => {
                
        let tempArray=[];

        for(let i = 0; i < result.length; i++ ){
          tempArray.push(result[i]['CLASSDESC']);
        }
        
        tempArray.sort(function(a,b){return a-b});
        
        this.removeDuplicates(tempArray);
            
      }); 

    }

    removeDuplicates(duplicateArray){

        let unique_array = duplicateArray.filter(function(elem, index, self) {
            return index == self.indexOf(elem);
        });
        this.items = unique_array;
        
        console.log('After remove duplicates');
        console.log(this.items);
        this.filterItems('');
    };

    
    filterItems(searchTerm){

        return this.items.filter((item) => {
          return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

    }

    

}