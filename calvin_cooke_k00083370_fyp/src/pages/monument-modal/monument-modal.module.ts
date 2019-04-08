import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MonumentModalPage } from './monument-modal';

@NgModule({
  declarations: [
    MonumentModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MonumentModalPage),
  ],
})
export class MonumentModalPageModule {}
