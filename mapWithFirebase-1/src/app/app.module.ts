import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import {GoogleMapComponent} from '../components/google-map/google-map';
import { Geolocation } from '@ionic-native/geolocation/ngx';



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import {HttpClientModule} from '@angular/common/http';
import {HttpModule} from '@angular/http';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';

import { AngularFirestoreModule } from 'angularfire2/firestore';

import {archDataService} from '../archData.service';
import {FilterMenuPage} from '../pages/filter-menu/filter-menu'
import {SearchTabsComponent} from '../components/search-tabs/search-tabs'
import {TypeFilterPage} from '../pages/type-filter/type-filter';
import {LocationFilterPage} from '../pages/location-filter/location-filter';
import {FavouriteFilterPage} from '../pages/favourite-filter/favourite-filter';
import {ReviewedFilterPage} from '../pages/reviewed-filter/reviewed-filter';
import {IonicSelectableModule} from 'ionic-selectable';
import { TypeListDataProvider } from '../providers/type-list-data/type-list-data';
import {AddReviewPage} from '../pages/add-review/add-review';
import { MonumentCommentProvider } from '../providers/monument-comment/monument-comment';

import{MapToIterable} from '../pipes/map-to-iterable-pipe';



// var config = {
//   apiKey: "AIzaSyDkwUm605E5id2YTcE_J_nqwhyVQ8jW9WM",
//   authDomain: "testmap-bbc90.firebaseapp.com",
//   databaseURL: "https://testmap-bbc90.firebaseio.com",
//   projectId: "testmap-bbc90",
//   storageBucket: "testmap-bbc90.appspot.com",
//   messagingSenderId: "649800103612"
// };
//firebase.initializeApp(config);
var config = {
  apiKey: "AIzaSyBr6-8QfzOAS9QZ35776-Dy9aORu17nh3w",
    authDomain: "lithic-2a70e.firebaseapp.com",
    databaseURL: "https://lithic-2a70e.firebaseio.com",
    projectId: "lithic-2a70e",
    storageBucket: "lithic-2a70e.appspot.com",
    messagingSenderId: "803254680100"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GoogleMapComponent,
    FilterMenuPage,
    SearchTabsComponent,
    TypeFilterPage,
    LocationFilterPage,
    FavouriteFilterPage,
    ReviewedFilterPage,
    AddReviewPage,
    MapToIterable
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(config),
    IonicModule.forRoot(MyApp),
    IonicSelectableModule,
    HttpModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    FilterMenuPage,
    TypeFilterPage,
    LocationFilterPage,
    FavouriteFilterPage,
    ReviewedFilterPage,
    AddReviewPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    archDataService,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    TypeListDataProvider,
    MonumentCommentProvider
  ],
  exports: [ ]
})
export class AppModule {}
