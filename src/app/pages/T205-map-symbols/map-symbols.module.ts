import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';

import { MapSymbolsRoutingModule } from './map-symbols-routing.module';
import { MapSymbolsComponent } from './map-symbols.component';


@NgModule({
  declarations: [
    MapSymbolsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzLayoutModule,
    NzIconModule,
    MapSymbolsRoutingModule
  ],
  bootstrap: [MapSymbolsComponent]
})
export class MapSymbolsModule { }
