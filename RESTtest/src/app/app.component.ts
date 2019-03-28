import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
//import {HttpClient} from '@angular/common/http';


import { HomePage } from '../pages/home/home';
import { HttpClient } from '@angular/common/http';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any = HomePage;
  archObj:any;
  monumentId = "cl00567";
  //`${this.monumentId}`

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private http: HttpClient) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    
    console.log(`http://webservices.npws.ie/arcgis/rest/services/NM/NationalMonuments/MapServer/0/query?where=entity_id=%27${this.monumentId}%27&outFields=webnotes&f=pjson`)
    // let obs = this.http.get('http://webservices.npws.ie/arcgis/rest/services/NM/NationalMonuments/MapServer/0/query?where=entity_id%3D%27cl00567%27&outFields=webnotes&f=pjson')
    let obs = this.http.get(`http://webservices.npws.ie/arcgis/rest/services/NM/NationalMonuments/MapServer/0/query?where=entity_id%3D%27${this.monumentId}%27&outFields=webnotes&f=pjson`)

    obs.subscribe((response) =>this.archObj =response);

    setTimeout(() => {
      console.log(this.archObj.features[0].attributes.WEBNOTES);
    }, 2000);
    
  }
}

