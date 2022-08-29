import { Component, OnInit } from '@angular/core';

@Component({
  selector: 't201-geojson',
  templateUrl: './geojson.component.html',
  styleUrls: ['./geojson.component.scss']
})
export class GeoJsonComponent implements OnInit {

  /**
   *
   */
  public get code() {
    //TODO: 请同学们实现
    return '';
  };
  public set code(value) {
    //TODO: 请同学们实现
  }

  constructor() { }

  ngOnInit(): void {
  }

}
