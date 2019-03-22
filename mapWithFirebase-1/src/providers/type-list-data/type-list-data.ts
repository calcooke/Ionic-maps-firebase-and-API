import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {archDataService} from '../../archData.service';
import { Observable } from 'rxjs';
import {Events} from 'ionic-angular';



@Injectable()
export class TypeListDataProvider {

  monumentPopulated:boolean = false;

  items: any = [];
  
    constructor(public http: Http, private archService:archDataService, public events:Events) {

 
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
        //console.log('Monument titles stored in array with no duplicates');
        //console.log(this.items);
        this.events.publish('monuments:retrieved', notice);
      
    };

    
    filterItems(searchTerm){

      this.monumentPopulated = true;


      let notice ="button pressed";
      this.events.publish('button:pressed', notice);

        return this.items.filter((item) => {
          return item.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1;
        });

    }

    

}