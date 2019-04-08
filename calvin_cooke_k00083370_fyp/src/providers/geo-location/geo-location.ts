import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';




@Injectable()
export class GeoLocationProvider {

  userLocation = {
    lat: null,
    long: null
  }

  constructor(public http: HttpClient, private geolocation:Geolocation) {
    
    // Retrieving and watching user location.
    
      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log('Watching for changes in location');
        console.log(data.coords.latitude);
      })

  }

  


}
