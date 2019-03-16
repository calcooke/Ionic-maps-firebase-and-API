import { Component, ViewChild } from '@angular/core';
import {archDataService} from '../../archData.service';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { IonicPage } from 'ionic-angular';

import {ModalController} from 'ionic-angular';


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
  
  
  
  constructor(public http: HttpClient, public archService:archDataService, public modalCtrl: ModalController) {}

  
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

      });;

    };

  }

  monumentDetail(title){
    console.log(title);
    this.clickedOn = true;
  }
  
}