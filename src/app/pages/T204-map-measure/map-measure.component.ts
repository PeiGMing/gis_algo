import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 't204-map-measure',
  templateUrl: './map-measure.component.html',
  styleUrls: ['./map-measure.component.scss']
})
export class MapMeasureComponent implements OnInit {

  public title = environment.t204_map_measure.title;

  constructor() { }

  ngOnInit(): void {
  }

  public onOpenClick() {

  }

  public onSaveClick() {

  }

  public onTurfClick() {

  }

  public onCartesianClick() {

  }

  public onSpheroidClick() {

  }

}
