import { Component, OnInit } from '@angular/core';

import 'codemirror/lib/codemirror';
import 'codemirror/mode/javascript/javascript';

import { MyNameService } from '../my-name.service';

@Component({
  selector: 't201-geojson',
  templateUrl: './geojson.component.html',
  styleUrls: ['./geojson.component.scss']
})
export class GeoJsonComponent implements OnInit {

  public get code() {//TODO: 请同学们实现 
    return this.service.code;
  };
  public set code(value) {//TODO: 请同学们实现 
    this.service.code = value;
  }

  constructor(
    private service: MyNameService
  ) { }

  ngOnInit(): void { }

}
