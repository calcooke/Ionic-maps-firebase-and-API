import { NgModule } from '@angular/core';
import { GoogleMapComponent } from './google-map/google-map';
import { SearchTabsComponent } from './search-tabs/search-tabs';
import { FilterMenuComponent } from './filter-menu/filter-menu';

@NgModule({
	declarations: [GoogleMapComponent,
    SearchTabsComponent,
    FilterMenuComponent
    ],
	imports: [],
	exports: [GoogleMapComponent,
    SearchTabsComponent,
    FilterMenuComponent
    ]
})
export class ComponentsModule {}
