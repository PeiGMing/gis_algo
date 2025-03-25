import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';

@Injectable({
  providedIn: 'root'
})
export class MapProjectionService {
  /**
   * feature 定位事件
   */
   locationFeature: EventEmitter<any> = new EventEmitter();
 
   private _source: GeoJsonSource;
   public get source() {
     return this._source;
   }

  constructor() {
    this._source = new GeoJsonSource();
   }

   public setDisplay(visible: boolean) {
     this._source.maplayer.setVisible(visible);
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

  public toMercatorByTurf() {
    const converted = turf.toMercator(this.source.geojson);
    this.source.geojson_string = GeoJSON2String(converted, true);
  }

  /**
   * 
   */
  public toMercator() {
    const earthRadius = 6378137.0;   
    const geojson = String2GeoJSON(this.source.geojson_string); 
    turf.coordEach(geojson, (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) => {
    const x = currentCoord[0] * Math.PI / 180.0;
    const y = Math. log(Math.tan((90.0 + currentCoord[1]) * Math.PI / 360.0));
    currentCoord[0] = earthRadius * x;
    currentCoord[1] = earthRadius * y;
  });
  this.source.geojson_string = GeoJSON2String(geojson, true);
  let a =  [8,7];
}}
