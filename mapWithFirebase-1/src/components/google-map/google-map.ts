import { Component, ViewChild } from '@angular/core';
//import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


declare var google: any;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  public monuments:any[];

  @ViewChild("map") mapElement;
  map: any;
  testMarker: any;
  google:any;
  
  
  constructor(public http: HttpClient) {
    console.log('Generating map');
  }

  

  ngOnInit(){
    console.log('Initializing map');
    setTimeout(() => {
       this.initMap();
    }, 1000);

    //this.retrieveMonuments();
    this.getJSONData();
    
  }

  retrieveMonuments(){

    //console.log(this.archService.monuments);

  }

  getJSONData(){
     
    let url = 'assets/archData.json'; 
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.monuments = result;
        console.log('Monument data retrievedin google ts file');
        console.log(result);
    });
  }

  initMap(){

    console.log('Setting coords');
    let coords = new google.maps.LatLng(53.13639186, -9.280849169);
    
    console.log('Setting map options');
    let mapOptions: google.maps.MapOptions = {

      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN

    }

    console.log('Assigning map options to map');  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log('Map set up and assigned');  
    this.addMarker(this.monuments);
  }

  addMarker(monuments){

    for(var i=0; i<monuments.length; i++){
      //console.log(monuments[i]["LATITUDE"]);
      let coords = new google.maps.LatLng(monuments[i]["LATITUDE"], monuments[i]["LONGITUDE"]);
      this.testMarker = new google.maps.Marker({
        position: coords,
        map : this.map,
        title: monuments[i]["CLASSDESC"]
      });
    };

  }
  // addMarker(){

  //     let coords = new google.maps.LatLng(53.13639186, -9.280849169);
  //     this.testMarker = new google.maps.Marker({
  //       position: coords,
  //       map : this.map,
  //       title: 'cool marker'
  //     });
  //   };

}
