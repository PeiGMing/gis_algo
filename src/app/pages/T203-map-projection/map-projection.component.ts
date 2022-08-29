import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 't203-map-projection',
  templateUrl: './map-projection.component.html',
  styleUrls: ['./map-projection.component.scss']
})
export class MapProjectionComponent implements OnInit {

  public title = environment.t203_map_projection.title;

  constructor() { }

  ngOnInit(): void {
  }

  public onOpenClick() {

  }

  public onSaveClick() {

  }

  public onMercatorClick() {

  }

}
