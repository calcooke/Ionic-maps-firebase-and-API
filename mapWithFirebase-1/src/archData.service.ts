import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable(
)
export class archDataService{

    public monuments:any;

    constructor(public http: HttpClient) {
        //console.log("Archeology database service created")
    }

    getData():Observable<any>{
 
        let url = 'assets/archData.json'; 

        let data: Observable<any> = this.http.get(url);
        return data;
      //   data.subscribe(result => {
      //     this.monuments = result;
      //   });

      // return this.monuments;
  }

  sayHello(){
   // console.log('CALLING A FUNCTION IN ARCH SERVICE');
  }

}