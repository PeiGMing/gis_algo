import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MapMeasureService } from './map-measure.service';

@Component({
  selector: 't204-map-measure',
  templateUrl: './map-measure.component.html',
  styleUrls: ['./map-measure.component.scss']
})
export class MapMeasureComponent implements OnInit {

  public title = environment.t204_map_measure.title;

  constructor(private service: MapMeasureService) { }

  ngOnInit(): void {
  }

  public onOpenClick() {
    this.openFileDialog((event) => {
      this.service.openFile(event.target.files[0]);
    });
  }

  public onSaveClick() {
    const filename = this.service.createFileName();
    this.service.saveFile(filename);
  }

  public onTurfClick() {
    this.service.areaByTurf();
  }

  public onCartesianClick() { 
    this.service.areaByPlane();
  }

  public onSpheroidClick() {
    this.service.areaBySphere();
  }

  /**
   *
   * @param callback
   */
   private openFileDialog(callback) {
    var inputEl = document.createElement("input");
    inputEl.type = "file";
    inputEl.accept = "application/json, text/plain";
    inputEl.multiple = false;
    if (typeof callback === "function") {
      inputEl.addEventListener("change", callback);
    }
    inputEl.dispatchEvent(new MouseEvent("click"));
  }

}
