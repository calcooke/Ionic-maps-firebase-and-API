import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FilterMenuPage } from './filter-menu';

@NgModule({
  declarations: [
    FilterMenuPage,
  ],
  imports: [
    IonicPageModule.forChild(FilterMenuPage),
  ],
})
export class FilterMenuPageModule {}
