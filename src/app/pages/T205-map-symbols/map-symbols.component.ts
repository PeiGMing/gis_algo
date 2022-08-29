import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 't205-map-symbols',
  templateUrl: './map-symbols.component.html',
  styleUrls: ['./map-symbols.component.scss']
})
export class MapSymbolsComponent implements OnInit {

  public title = environment.t205_map_symbols.title;

  constructor() { }

  ngOnInit(): void {
  }

}
