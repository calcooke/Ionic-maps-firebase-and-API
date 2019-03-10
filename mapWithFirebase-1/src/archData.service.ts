import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable(
)
export class archDataService{

    public monuments:any = "MONUMENTS BEFORE RETRIEVAL IN ARCHSERVICE";

    constructor(public http: HttpClient) {
        //console.log("Archeology database service created")
        this.monuments = this.getData();
    }

    getData():Observable<any>{
 
        let url = 'assets/archData.json'; 
        let data: Observable<any> = this.http.get(url);
        data.subscribe(result => {
          this.monuments = result;
          
            // console.log(this.monuments); 
            // console.log('MONUMENTS AFTER RETRIEVAL');
        });

      return this.monuments;
  }

  sayHello(){
   // console.log('CALLING A FUNCTION IN ARCH SERVICE');
  }

}