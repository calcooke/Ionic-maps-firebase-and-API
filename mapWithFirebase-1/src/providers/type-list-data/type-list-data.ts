import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {archDataService} from '../../archData.service';
import { Observable } from 'rxjs';



@Injectable()
export class TypeListDataProvider {

  itemsRetrieved:boolean = false;
  items: any = [];
  
    constructor(public http: Http, private archService:archDataService) {

      this.archService.getData().subscribe(result => {
        
        //console.log('Before remove duplicates');
        
        let tempArray  =[];
        //this.items = result;
        //this.removeDuplicates(this.items);
        for(let i = 0; i < result.length; i++ ){
          tempArray.push(result[i]['CLASSDESC']);
        }
        
        console.log('Before removing duplicates');
        console.log(tempArray);

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
    };

    
    filterItems(searchTerm){

        return this.items.filter((item) => {
          return item.CLASSDESC.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

    }

    

}