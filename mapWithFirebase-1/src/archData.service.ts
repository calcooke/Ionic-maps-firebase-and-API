import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
)
export class archDataService{

    public monument:any;

    constructor(public http: HttpClient) {
        this.getData();
    }

    getData(){

        
        let url = 'assets/archData.json'; 
        let data: Observable<any> = this.http.get(url);
        data.subscribe(result => {
          this.monument = result;
            console.log(result);
        });
      }

}