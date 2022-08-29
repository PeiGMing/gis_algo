import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapSymbolsComponent } from './map-symbols.component';

const routes: Routes = [
  { path: '', component: MapSymbolsComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MapSymbolsRoutingModule { }
