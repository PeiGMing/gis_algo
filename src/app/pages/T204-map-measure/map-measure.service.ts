import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';

@Injectable({
  providedIn: 'root'
})
export class MapMeasureService {
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

  public areaByTurf() {
    if (this.source.geojson != null) {
      if (this.source.geojson.type === 'FeatureCollection') {
        for (let i = 0; i < this.source.geojson.features.length; i++) {
          const feature = this.source.geojson.features[i];
          const area = turf.area(feature);
          if (feature.properties === undefined) {
            feature.properties = {};
          }
          feature.properties['area_turf'] = area;
        }
        this.source.geojson_string = GeoJSON2String(this.source.geojson, true); 
      }
    }
  }

  /**
   *
   */
  public areaByPlane() {
    if (this.source.geojson != null) {
      if (this.source.geojson.type === 'FeatureCollection') {
        for (let i = 0; i < this.source.geojson.features.length; i++) {
          const feature = this.source.geojson.features[i];
          const area = this.geometryAreaByPlane(feature.geometry);
          if (feature.properties === undefined) {
            feature.properties = {};
          }
          feature.properties['area_plane'] = area;
        }
        this.source.geojson_string = GeoJSON2String(this.source.geojson, true);
      }
    }
  }
  
  private geometryAreaByPlane(geometry) {
    switch (geometry.type) {
      case 'MultiPolygon':
        return this.multiPolygonAreaByPlane(geometry.coordinates);
      case 'Polygon':
        return this.polygonAreaByPlane(geometry.coordinates);
      default : 
        return 0.0;
    }
  }
      

  private multiPolygonAreaByPlane(coordinates) {
    let area = 0.0;
    for (let i = 0; i < coordinates.length; i++) {
      area += this.polygonAreaByPlane(coordinates[i]);
    }
    return area; 
  }

  private polygonAreaByPlane(coordinates) {
    let area = 0.0;
    for (let i = 0; i < coordinates.length; i++) {
      area += this.planaArea(coordinates[i]);
    }
    return area;
  }

  private planaArea(coordinates) {
    const length = coordinates.length;
    if (length < 3) return 0.0;

    let area = 0.0;
    for (let i = 0; i < length - 1; i++) {
      area += -coordinates[i][0] * coordinates[i + 1][1] + coordinates[i + 1][0] * coordinates[i][1];
    }
      return area * 0.5;
  }

  /**
   * 
   */
  public areaBySphere() {
    if (this.source.geojson != null) {
      if (this.source.geojson.type === 'FeatureCollection') {
        for (let i = 0; i < this.source.geojson.features.length; i++) {
          const feature = this.source.geojson.features[i];
          const area = this.geometryBySphere(feature.geometry);
          if (feature.properties === undefined) {
            feature.properties = {};
          }
          feature.properties['area_sphere'] = area;
        }
        this.source.geojson_string = GeoJSON2String(this.source.geojson, true);
      }
    }
  }

  private geometryBySphere(geometry) {
    switch (geometry.type) {
      case 'MultiPolygon':
        return this.multiPolygonAreaBySphere(geometry.coordinates);
      case 'Polygon':
        return this.polygonAreaBySphere(geometry.coordinates);
      default:
        return 0.0;
    }
  }

  private multiPolygonAreaBySphere(coordinates) {
    let area = 0.0;
    for (let i = 0; i < coordinates.length; i++) {
      area += this.polygonAreaBySphere(coordinates[i]);
    }
    return area;
  }


  private polygonAreaBySphere(coordinates) {
    let area = 0.0;
    for (let i = 0; i < coordinates.length; i++) {
      area += this.sphereArea(coordinates[i]);
      
    }
    return area;
  }


  public sphereArea(coordinates) {
    const length = coordinates.length;
    if (length < 3) return 0.0;

    let area = 0.0;
    for (let i = 0; i < length - 1; i++) {
      area += this.trapezoidArea(coordinates[i][0] * Math.PI / 180, coordinates[i + 1][0] * Math.PI / 180, 
        30 * Math.PI / 180, (coordinates[i][1] + coordinates[i + 1][1]) * 0.5 * Math.PI / 180);     
    }
    return area;
  }
  
  private trapezoidArea(lon1, lon2, lat1, lat2) {
    // WGS84 椭球參数
    const a = 6378137.0;
    const f = 1 / 298.257223563;
    const b = a - a * f;
    const e2 = (a * a - b * b) / (a * a);
    const A = 1 + e2 / 2.0 + 3 * e2 * e2 / 8 + 5 * e2 * e2 * e2 / 16;
    const B = e2 / 6 + 3 * e2 * e2 / 16 + 3 * e2 * e2 * e2 / 16;
    const C = 3 * e2 * e2 / 80 + e2 * e2 * e2 / 16;
    const D = e2 * e2 * e2 / 112;
    
    const K = 2 * a * a * (1 - e2) * (lon2 - lon1);
    const dlat = lat2 - lat1;
    const mlat = 0.5 * (lat1 + lat2);
    const T = K * (A * Math.sin(0.5 * dlat) * Math.cos(mlat)
      - B * Math.sin(1.5 * dlat) * Math.cos(3 * mlat)
      + C * Math.sin(2.5 * dlat) * Math.cos(5 * mlat)
      - D * Math.sin(3.5 * dlat) * Math.cos(7 * mlat));
    return T;
  }
}
