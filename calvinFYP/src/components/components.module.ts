import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import { SearchTabsComponent } from './search-tabs/search-tabs';
import { FilterMenuPage } from '../pages/filter-menu/filter-menu';

@NgModule({
	declarations: [GoogleMapComponent,
    SearchTabsComponent,
    FilterMenuPage
    ],
	imports: [],
	exports: [GoogleMapComponent,
    SearchTabsComponent,
    FilterMenuPage
    ]
})
export class ComponentsModule {}
