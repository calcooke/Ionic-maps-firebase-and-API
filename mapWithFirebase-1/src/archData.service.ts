import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable(
)
export class archDataService{

    public monuments:any;

    constructor(public http: HttpClient) {
        console.log("Archeology database service created")
        this.getData();
    }

    getData(){

        
        let url = 'assets/archData.json'; 
        let data: Observable<any> = this.http.get(url);
        data.subscribe(result => {
          this.monuments = result;
            console.log('Monument data retrieved in archService');
            console.log(this.monuments);
        });
  }

  sayHello(){
    console.log('hello');
  }

}