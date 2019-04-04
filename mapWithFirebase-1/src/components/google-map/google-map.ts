import { Component, ViewChild } from '@angular/core';
import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IonicPage } from 'ionic-angular';

import {ModalController} from 'ionic-angular';

import {Events} from 'ionic-angular';
import { GeoLocationProvider } from '../../providers/geo-location/geo-location';
import { Geolocation } from '@ionic-native/geolocation';



declare var google: any;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  public monuments:any = 'Monuments still unassigned';
  public monumentType;
  public clickedOn:boolean = false;
  

  @ViewChild("map") mapElement;
  map: any;
  monumentMarker: any;
  google:any;
  cardTitle: string;
  monumentsOnMap: any = []; 
  userLocation:any;
  
  
  constructor(public http: HttpClient, public archService:archDataService, public modalCtrl: ModalController, public events:Events, private geolocation:Geolocation) {

    events.subscribe('filter:type', (types)=>{
      
      this.filterByType(types);
      //this.events.publish('items:selected');
      
    });

    events.subscribe('clear:filters', (types)=>{
      
      this.clearFilter();
      
    });

    

  }
  ngOnInit(){


    this.cardTitle = 'New card text';
    //console.log('Initializing map');
    setTimeout(() => {
       this.initMap();
    }, 1000);
    
    this.retrieveMonuments();
    
   
  }

  
  public openModal(monumenttitle:any, monumentId ){


    var data = {message: monumenttitle,
                id: monumentId}; 
    var modalPage = this.modalCtrl.create('MonumentModalPage', data); 
    modalPage.present();

  }


  retrieveMonuments(){
  
      this.archService.getData().subscribe(result => {
          this.monuments = result;
      })

  }


  ionViewDidLoad(){
    //Will this sort the google map issues?
    //this.initMap();
  }

  initMap(){

    //console.log('Setting map center coords');
    //let coords = new google.maps.LatLng(52.35465106, -7.700976012);
    let coords = new google.maps.LatLng(53.13639186, -9.280849169);
    
    //console.log('Setting map options');
    let mapOptions: google.maps.MapOptions = {

      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true, 

    }

    //console.log('Assigning map options to map');  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //console.log('Populating map with markers');  
    this.addMarker(this.monuments);
  }

  addMarker(monuments){

    for(var i=0; i<monuments.length; i++){
      
      let monumentTitle =  monuments[i]["CLASSDESC"];
      let monumentId = monuments[i]["ENTITY_ID"];
      let coords = new google.maps.LatLng(monuments[i]["LATITUDE"], monuments[i]["LONGITUDE"]);
      this.monumentMarker = new google.maps.Marker({
        position: coords,
        map : this.map,
        title: monuments[i]["CLASSDESC"]
      }).addListener('click', () =>{

        this.monumentDetail(monumentTitle);
        this.openModal(monumentTitle, monumentId);

      });

      this.monumentsOnMap.push(this.monumentMarker);
      
      this.addUserMarker();
    };

  }

  addUserMarker(){

    this.geolocation.getCurrentPosition().then((resp) => {
      // console.log(resp.coords.latitude);
      // console.log(resp.coords.longitude);
      // this.userLocation.lat = resp.coords.latitude;
      // this.userLocation.long = resp.coords.longitude;
      let coords = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);

        this.userLocation = new google.maps.Marker({
          position: coords,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 5
          },
          map: this.map

        });

     }).catch((error) => {
       console.log('Error getting location', error);
     });

  }

  monumentDetail(title){
    console.log(title);
    
    

    this.clickedOn = true;
  }

  filterByType(selected){

    
    //console.log('Before removing');

    //let tempArray = this.monumentsOnMap.filter(item => selected.indexOf(item) === -1);

    

    //   return selected.indexOf(item) === -1;
      
    // });
    // console.log('After removing');
    // console.log(tempArray);

    // tempArray.filter(function(item){
    //   return selected.indexOf(item) === -1;
      
    // });

    //console.log(tempArray);

    //for(let i=0; i < this.monumentsOnMap.length; i++){

      console.log(selected);

    //   for(let j = 0; j < selected.length; j++){

    //     for(let i=0; i < this.monumentsOnMap.length; i++){

    //         if(this.monumentsOnMap[i]["l"].title != selected[j]){

    //           console.log('match');
              
    //           this.monumentsOnMap[i]["l"].setVisible(false);
            
      
    //         }

    //     }
    // }

    for (let i = 0; i < this.monumentsOnMap.length; i++)
      {
        // let's assume we are not going to find this monument in the selected array
        let found = false;

        // now let's loop through the selected list
        for (let j = 0; j < selected.length; j++)
        {
          if (this.monumentsOnMap[i]['l'].title == selected[j])
          {
              // Ok, this monument has been selected, so we are going to keep it
              // visible. Let's break out of the containing loop i.e. looping through
              // the selected array, as it is pointless continuing the search as we 
              // we have found a match
              found = true;
              break;
         }
        }

        if (found == false)
        {
         this.monumentsOnMap[i]['l'].setVisible(false);
        }
      }

    

  }

  clearFilter(){

    for(let i=0; i < this.monumentsOnMap.length; i++){

      this.monumentsOnMap[i]["l"].setVisible(true);
      
    }

  }
  
}