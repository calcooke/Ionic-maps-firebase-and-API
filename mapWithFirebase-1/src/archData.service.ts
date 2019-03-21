import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable(
)
export class archDataService{

    public monuments:any;
    public monumntTypes:any = [];

    constructor(public http: HttpClient) {
        
    }

    getData():Observable<any>{
 
        let url = 'assets/archData.json'; 

        let data: Observable<any> = this.http.get(url);
      
        return data;
      
    }
    
}

