import { Component, ViewChild } from '@angular/core';


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
  
  
  constructor() {
    console.log('Generating map');
  }

  ngOnInit(){
    console.log('Initializing map');
    setTimeout(() => {
       this.initMap();
    }, 1000);
   
    
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
    this.addMarker();
  }

  addMarker(){

      let coords = new google.maps.LatLng(53.13639186, -9.280849169);
      this.testMarker = new google.maps.Marker({
        position: coords,
        map : this.map,
        title: 'cool marker'
      });
    };

}
