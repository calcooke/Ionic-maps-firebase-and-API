import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable(
)
export class archDataService{

    public monuments:any;
    public monumentDescription:any;
    
    constructor(public http: HttpClient) {
        
    }

    getData():Observable<any>{
 
        let url = 'assets/archData.json'; 

        let data: Observable<any> = this.http.get(url);
      
        return data;
      
    }

    retrieveDescription(id):Observable<any>{

        let obs = this.http.get(`http://webservices.npws.ie/arcgis/rest/services/NM/NationalMonuments/MapServer/0/query?where=entity_id%3D%27${id}%27&outFields=webnotes&f=pjson`)

        //obs.subscribe((response) => console.log(response));

        return obs;

    }


    
}

