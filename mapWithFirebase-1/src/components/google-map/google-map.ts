import { Component, ViewChild } from '@angular/core';
import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IonicPage } from 'ionic-angular';

import {ModalController} from 'ionic-angular';

import {Events} from 'ionic-angular';


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
  
  
  constructor(public http: HttpClient, public archService:archDataService, public modalCtrl: ModalController, public events:Events) {

    events.subscribe('filter:type', (types)=>{
      
      //console.log(notice);
      // for(let i = 0; i < types.length; i++){
      //   console.log(types[i]);
      // }

      this.filterByType(types);
      
    });


  }

  
  ngOnInit(){
    
    this.cardTitle = 'New card text';
    //console.log('Initializing map');
    setTimeout(() => {
       this.initMap();
    }, 100);
    //this.initMap();
  
    this.retrieveMonuments();
   
  }

  


  public openModal(monumenttitle:any ){

    var data = {message: monumenttitle}; 
    var modalPage = this.modalCtrl.create('MonumentModalPage', data); 
    modalPage.present();

  }


  retrieveMonuments(){
  
  //   this.archService.getData();
  //   setTimeout(() => {
  //     console.log(this.archService.monuments);
  //     this.monuments = this.archService.monuments;
  //  }, 50);

  //  let data: Observable<any> = this.archService.getData();
  //       data.subscribe(result => {
  //         this.monuments = result;
  //       });

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
      let coords = new google.maps.LatLng(monuments[i]["LATITUDE"], monuments[i]["LONGITUDE"]);
      this.monumentMarker = new google.maps.Marker({
        position: coords,
        map : this.map,
        title: monuments[i]["CLASSDESC"]
      }).addListener('click', () =>{

        this.monumentDetail(monumentTitle);
        this.openModal(monumentTitle);

      });

      this.monumentsOnMap.push(this.monumentMarker);
      

    };

  }

  monumentDetail(title){
    console.log(title);
    
    

    this.clickedOn = true;
  }

  filterByType(selected){

    // for(let i = 0; i < selected.length; i++){
    //     console.log(selected[i]);
    // }

    // for(let i=0; i < this.monumentsOnMap.length; i++){
    //   //console.log(this.monumentsOnMap[i]["l"].title);

    //   for(let j = 0; j < selected.length; j++){

    //     if(this.monumentsOnMap[i]["l"].title != selected[j]){
    //       console.log('match');
    //     }

    //   }
      
    // }

    for(let j = 0; j < selected.length; j++){

      for(let i=0; i < this.monumentsOnMap.length; i++){

        if(this.monumentsOnMap[i]["l"].title != selected[j]){
                 console.log('match');
                 this.monumentsOnMap[i]["l"].setVisible(false);
  
        }

      }
    }


    

  }

  clearFilter(){

    for(let i=0; i < this.monumentsOnMap.length; i++){
      //console.log(this.monumentsOnMap[i]["l"].title);
      this.monumentsOnMap[i]["l"].setVisible(true);
      
    }

  }
  
}