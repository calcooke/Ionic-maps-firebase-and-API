import { Component, ViewChild } from '@angular/core';
import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';
import { ElementRef } from '@angular/core';
import {ModalController} from 'ionic-angular';
import {Events} from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {Platform} from 'ionic-angular';

declare var google: any;

@Component({
  selector: 'google-map',
  templateUrl: 'google-map.html'
})
export class GoogleMapComponent {

  public monuments:any = 'Monuments still unassigned';
  public monumentType;
  public clickedOn:boolean = false;
  
  @ViewChild("map") mapElement: ElementRef;
  map: any;
  monumentMarker: any;
  google:any;
  cardTitle: string;
  monumentsOnMap: any = []; 
  userLocation:any;
  userCoords:any;
  filterActive: boolean = false;
  
  
  
  constructor(public http: HttpClient, public platform:Platform, public archService:archDataService, public modalCtrl: ModalController, public events:Events, private geolocation:Geolocation) {

    events.subscribe('filter:type', (types)=>{
      
      this.filterByType(types);
      
    });

    events.subscribe('clear:filters', (types)=>{
      
      this.clearFilter();
      
    });

    console.log("Retrieving and tracking user location");

    let watch = this.geolocation.watchPosition({enableHighAccuracy: true});   
      watch.subscribe((resp) => {                                               
      
      this.userCoords = new google.maps.LatLng(resp.coords.latitude, resp.coords.longitude);
      });

    

  }
  ngOnInit(){

    this.cardTitle = 'New card text';
    console.log('Initialising map');
    setTimeout(() => {
       this.initMap();
    }, 1000);
    
    this.retrieveMonuments();
    
   
  }

  
  public openModal(monumenttitle:any, monumentId ){

    console.log("I call openModal() to open a modal page and pass the title and id");
    var data = {message: monumenttitle,
                id: monumentId}; 
    console.log("Monument title and id are put into a data object");           
    var modalPage = this.modalCtrl.create('MonumentModalPage', data); 
    console.log("The modal page is created with the info"); 
    modalPage.present();
    console.log("The modal's present method is called to open it");
    

  }


  retrieveMonuments(){

      console.log("Retrieving monuments from database");
      this.archService.getData().subscribe(result => {
          this.monuments = result;
      })

  }


  ionViewDidLoad(){

    console.log('Map view loaded');
    
  }

  initMap(){

    console.log('InitMap called. Checking if the platftorm in ready.');

    this.platform.ready().then(()=> {  
    
    console.log('The platform is ready');
    
    console.log('Setting up map with map options');
    let mapOptions: google.maps.MapOptions = {

      center: this.userCoords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true, 

    }

    console.log('Assigning map options to map');  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    console.log('Populating map with monument markers');  
    this.addMarker(this.monuments);



})

  }

  // Placing a marker on the map with the coordinates of each monument

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

      console.log("Monument markers displayed on map, placing user loaction icon on map");
      
      this.addUserMarker();
    };

  }

  // Adding the user icon at the user's location

  addUserMarker(){

        this.userLocation = new google.maps.Marker({
          position: this.userCoords,
          icon: {
            path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
            scale: 5
          },
          map: this.map

        });
        
  
  }


  // This function was for testing purposes

  monumentDetail(title){

    console.log("Clicking on a marker works");
    
    this.clickedOn = true;
  }

  // Filter by setting the visibility of each monument in relation to what
  // monuments were selected in the filter menu list

  filterByType(selected){

    
      console.log("Array of selected items is: ", selected);

 

    for (let i = 0; i < this.monumentsOnMap.length; i++)
      {
        
        let found = false;

        // Loop through the selected items
        for (let j = 0; j < selected.length; j++)
        {
          if (this.monumentsOnMap[i]['l'].title == selected[j])
          {
              //Match found, break and loop again.
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

  // Resetting the visibility of all markers

  clearFilter(){

    console.log("Resetting the visibility of all markers");

    for(let i=0; i < this.monumentsOnMap.length; i++){

      this.monumentsOnMap[i]["l"].setVisible(true);
      
    }

    console.log("Publishing an event notifying that the filter has been reset and is now inactive")

    // The home.ts page listens out for this evn so it sets the visibility of the clear
    // filter icon back to false

    this.events.publish('filter:inactive');

  }
  
}