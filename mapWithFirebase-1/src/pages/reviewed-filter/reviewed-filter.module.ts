import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReviewedFilterPage } from './reviewed-filter';

@NgModule({
  declarations: [
    ReviewedFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(ReviewedFilterPage),
  ],
})
export class ReviewedFilterPageModule {}
