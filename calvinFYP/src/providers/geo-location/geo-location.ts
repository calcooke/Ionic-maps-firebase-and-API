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
    
      // this.geolocation.getCurrentPosition().then((resp) => {
      //   console.log(resp.coords.latitude);
      //   console.log(resp.coords.longitude);
      //   this.userLocation.lat = resp.coords.latitude;
      //   this.userLocation.long = resp.coords.longitude;
      //   console.log('User location is');
      //   console.log(this.userLocation);
      // }).catch((error) => {
      //   console.log('Error getting location', error);
      // });

      let watch = this.geolocation.watchPosition();
      watch.subscribe((data) => {
        console.log('Watching for changes in location');
        console.log(data.coords.latitude);
      })

  }

  //retrieveLocation():Observable<any>{

    // let data:Observable<any>;

    // let data = this.geolocation.getCurrentPosition().then((resp) => {

      // console.log(resp.coords.latitude);
      // console.log(resp.coords.longitude);
      // this.userLocation.lat = resp.coords.latitude;
      // this.userLocation.long = resp.coords.longitude;
      
      
    // }).catch((error) => {
    //   console.log('Error getting location', error);
    // });

    // return this.userLocation;

  //}


 
 



}
