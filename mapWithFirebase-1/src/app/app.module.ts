import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {GoogleMapComponent} from '../components/google-map/google-map';
import {InformationCardComponent} from '../components/information-card/information-card';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from '@angular/common/http';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import {archDataService} from '../archData.service';



var config = {
  apiKey: "AIzaSyDkwUm605E5id2YTcE_J_nqwhyVQ8jW9WM",
  authDomain: "testmap-bbc90.firebaseapp.com",
  databaseURL: "https://testmap-bbc90.firebaseio.com",
  projectId: "testmap-bbc90",
  storageBucket: "testmap-bbc90.appspot.com",
  messagingSenderId: "649800103612"
};
//firebase.initializeApp(config);

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GoogleMapComponent,
    InformationCardComponent
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    archDataService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ],
  exports: [ ]
})
export class AppModule {}
