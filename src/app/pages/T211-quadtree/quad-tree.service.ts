import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';
import { GeodeticQuaternaryCode } from 'src/app/lib/services/geohash/geodetic-quaternary-code';
import { QuaternaryCode } from 'src/app/lib/services/geohash/quaternary-code';

@Injectable({
  providedIn: 'root'
})
export class QuadTreeService {

  /**
   * feature 定位事件
   */
  locationFeature: EventEmitter<any> = new EventEmitter();

  private _source: GeoJsonSource;
  public get source() {
    return this._source;
  }
  public setDisplay(visible: boolean) {
    this._source.maplayer.setVisible(visible);
  }

  /**
   *
   */
  constructor() {
    this._source = new GeoJsonSource();
  }

  /**
   *
   * @returns
   */
  public createFileName() {
    return uuidv4() + '.json';
  }

  /**
   *
   * @param file
   */
  public openFile(file: File) {
    const reader = new FileReader();
    reader.onload = (event) => {
      this.source.geojson_string = event.target.result as string;
    };
    reader.readAsText(file, 'utf-8');
  }

  /**
   *
   */
  public saveFile(filename) {
    this.source.saveFile(filename);
  }

  /**
   * 生成网格
   */
  public buildGrid() {
    const gm = new GeodeticQuaternaryCode();
    const m = new QuaternaryCode();

    if (this.source.geojson != null) {
      const geojson = String2GeoJSON(this.source.geojson_string);
      turf.featureEach(geojson, function (currentFeature, featureIndex) {
        //TODO: 请同学们完成
        //=currentFeature
        //=featureIndex
      });
      this.source.geojson_string = GeoJSON2String(geojson, true);
    }
  }

  /**
   * 合并网格
   */
  public mergeGrid() {
    this.buildGrid();

    //TODO: 请同学们完成

  }
}
