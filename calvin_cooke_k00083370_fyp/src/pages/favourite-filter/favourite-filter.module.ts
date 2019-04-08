import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouriteFilterPage } from './favourite-filter';

@NgModule({
  declarations: [
    FavouriteFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouriteFilterPage),
  ],
})
export class FavouriteFilterPageModule {}
