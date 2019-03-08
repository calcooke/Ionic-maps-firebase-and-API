import { Component, ViewChild } from '@angular/core';
import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


declare var google: any;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  public monuments:any;
  public monumentType;
  public clickedOn:boolean = false;
  
  

  

  @ViewChild("map") mapElement;
  map: any;
  monumentMarker: any;
  google:any;
  
  
  constructor(public http: HttpClient, public archService:archDataService) {
    
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

    console.log('WORKED');
    
    console.log('WORKED');

  }

  getJSONData(){
    
     
    let url = 'assets/archData.json'; 
    let data: Observable<any> = this.http.get(url);
    data.subscribe(result => {
      this.monuments = result;
        console.log('Monument data retrieved in google ts file');
        console.log(this.monuments);
    });
  }

  initMap(){

    console.log('Setting map center coords');
    let coords = new google.maps.LatLng(53.13639186, -9.280849169);
    
    console.log('Setting map options');
    let mapOptions: google.maps.MapOptions = {

      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN

    }

    console.log('Assigning map options to map');  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log('Map set up');  
    this.addMarker(this.monuments);
  }

  addMarker(monuments){

    console.log('Populating map with');

    for(var i=0; i<monuments.length; i++){
      
      let coords = new google.maps.LatLng(monuments[i]["LATITUDE"], monuments[i]["LONGITUDE"]);
      this.monumentMarker = new google.maps.Marker({
        position: coords,
        map : this.map,
        title: monuments[i]["CLASSDESC"]
      });

      // this.monumentMarker.addListener('click', function(){
         
      //   this.monumentDetail();
          
      // });

      this.monumentMarker.addListener('click', () =>{

        this.monumentDetail();

      })

    };

  }

  monumentDetail(){
    console.log('Function called');
  }
  
  

}