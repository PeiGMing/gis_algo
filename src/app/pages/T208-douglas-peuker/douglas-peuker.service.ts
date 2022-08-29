import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';

@Injectable({
  providedIn: 'root'
})
export class DouglasPeukerService {
  /**
   * feature 定位事件
   */
  locationFeature: EventEmitter<any> = new EventEmitter();
  /**
   * 加载文件数据
   */
  loadFile: EventEmitter<any> = new EventEmitter();
  /**
   * 数据压缩比率变化
   */
  rateChange: EventEmitter<any> = new EventEmitter();

  private _source: GeoJsonSource;
  public get source() {
    return this._source;
  }

  private _displaySource: GeoJsonSource;
  public get displaySource() {
    return this._displaySource;
  }
  public setDisplay(visible: boolean) {
    this._displaySource.maplayer.setVisible(visible);
  }

  private _tolerance = 10.0;
  public get tolerance() {
    return this._tolerance;
  }
  public set tolerance(value) {
    this._tolerance = value;
  }

  /**
   *
   */
  public get rate() {
    if (this.source.geojson == null) {
      return 1.0;
    }
    let s = this.getPointCount(this.source.geojson);
    let d = this.getPointCount(this.displaySource.geojson);
    return 1.0 - d / s;
  }

  /**
   *
   */
  constructor() {
    this._source = new GeoJsonSource();
    this._displaySource = new GeoJsonSource();
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
      this.loadFile.emit();
      this.source.geojson_string = event.target.result as string;
      this.reset();
    };
    reader.readAsText(file, 'utf-8');
  }

  /**
   *
   */
  public saveFile(filename) {
    this.displaySource.saveFile(filename);
  }

  /**
   * 恢复source
   */
  public reset() {
    const geojson = String2GeoJSON(this.source.geojson_string);
    this.displaySource.geojson_string = GeoJSON2String(geojson, true);
    this.rateChange.emit();
  }

  /**
   *
   * @param geojson
   */
  private getPointCount(geojson) {
    let count = 0;
    turf.coordEach(geojson, (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) => {
      count++;
    });
    return count;
  }

  /**
   *
   */
  public douglasTurf() {
    //TODO 请同学们完成

  }

  /**
   *
   */
  public douglas() {
    //TODO 请同学们完成

  }

  /**
   *
   * @param points
   * @param first
   * @param last
   * @param tolerance
   */
  private getMaxDist(points, first, last, tolerance) {
    //TODO 请同学们完成
    let maxDist = tolerance;
    let index;
    for (var i = first + 1; i < last; i++) {
      let dist = this.getSegDist(points[i], points[first], points[last]);
      if (dist > maxDist) {
        index = i;
        maxDist = dist;
      }
    }
    return { maxDist: maxDist, index: index };
  }

  /**
   * distance from a point to a segment
   * @param p
   * @param p1
   * @param p2
   * @returns
   */
  private getSegDist(p, p1, p2) {
    //TODO 请同学们完成
    let x = p1[0];
    let y = p1[1];
    let dx = p2[0] - x;
    let dy = p2[1] - y;

    if (dx !== 0 || dy !== 0) {
      let t = ((p[0] - x) * dx + (p[1] - y) * dy) / (dx * dx + dy * dy);

      if (t > 1) {
        x = p2[0];
        y = p2[1];
      } else if (t > 0) {
        x += dx * t;
        y += dy * t;
      }
    }

    dx = p[0] - x;
    dy = p[1] - y;

    return Math.sqrt(dx * dx + dy * dy);
  }

}
