import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LocationFilterPage } from './location-filter';

@NgModule({
  declarations: [
    LocationFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(LocationFilterPage),
  ],
})
export class LocationFilterPageModule {}
