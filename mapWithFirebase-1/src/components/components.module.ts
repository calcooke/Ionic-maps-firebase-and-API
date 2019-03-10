import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import { InformationCardComponent } from './information-card/information-card';
@NgModule({
	declarations: [GoogleMapComponent,
    InformationCardComponent],
	imports: [],
	exports: [GoogleMapComponent,
    InformationCardComponent]
})
export class ComponentsModule {}
