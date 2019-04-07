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
  //@ViewChild("map") mapElement;
  map: any;
  monumentMarker: any;
  google:any;
  cardTitle: string;
  monumentsOnMap: any = []; 
  userLocation:any;
  filterActive: boolean = false;
  
  
  constructor(public http: HttpClient, public platform:Platform, public archService:archDataService, public modalCtrl: ModalController, public events:Events, private geolocation:Geolocation) {

    events.subscribe('filter:type', (types)=>{
      
      this.filterByType(types);
      //this.events.publish('items:selected');
      
    });

    events.subscribe('clear:filters', (types)=>{
      
      this.clearFilter();
      
    });

    // platform.ready().then(()=> {

    //   setTimeout(() => {
    //     this.initMap();
    //  }, 1000);

    // });

    

  }
  ngOnInit(){

    //this.events.publish('filter:inactive');

    console.log('ng OnInit did in fact init');
    this.cardTitle = 'New card text';
    console.log('Calling Init map');
    setTimeout(() => {
       this.initMap();
    }, 1000);
    
    this.retrieveMonuments();
    
   
  }

  
  public openModal(monumenttitle:any, monumentId ){

    console.log("I call openModal() to open the modal page and pass the title and id");
    var data = {message: monumenttitle,
                id: monumentId}; 
    console.log("title and id are put into a data object");           
    var modalPage = this.modalCtrl.create('MonumentModalPage', data); 
    console.log("The modal page is created with the info"); 
    modalPage.present();
    console.log("The modal's present method is called to open it");
    

  }


  retrieveMonuments(){
  
      this.archService.getData().subscribe(result => {
          this.monuments = result;
      })

  }


  ionViewDidLoad(){
    console.log('IonView did in fact load');
    //this.retrieveMonuments();
    //Will this sort the google map issues?
    //this.initMap();
    //this.platform.ready().then(()=> {

    //   setTimeout(() => {
    //     this.initMap();
    //  }, 1000);

    //});
  }

  initMap(){

    console.log('InitMap called. Checking if the platftorm in ready.');

    this.platform.ready().then(()=> {  
    
    console.log('The platform is ready');
    //let coords = new google.maps.LatLng(52.35465106, -7.700976012);
    //setTimeout(function(){
    let coords = new google.maps.LatLng(53.13639186, -9.280849169);
    console.log('coords set');
    console.log('Setting map options');
    let mapOptions: google.maps.MapOptions = {

      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
      disableDefaultUI: true, 

    }

    console.log('Assigning map options to map');  
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //console.log('Populating map with markers');  
    this.addMarker(this.monuments);

  //}, 1000 );


})

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

    //this.geolocation.getCurrentPosition({enableHighAccuracy: true}).then((resp) => {  //uncomment this line for working stationary position
      let watch = this.geolocation.watchPosition({enableHighAccuracy: true});   //Delete this line
      watch.subscribe((resp) => {                                               // and this line if watching position breaks
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
        
    //  }).catch((error) => {                                    //Uncomment these lines to get stationary position working
    //    console.log('Error getting location', error);        // getCurrentPosition is a promise so it needs these
     });

  }

  monumentDetail(title){
    console.log("Clicking on a marker works");
    
    

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

    this.events.publish('filter:inactive');

  }
  
}