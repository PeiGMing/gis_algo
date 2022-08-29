import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

import { MapComponent } from './map/map.component';

@Injectable({
  providedIn: 'root'
})
export class HelloGeoJsonService {
  /**
   * 地图组件
   */
  private _map: MapComponent;
  public get map() {
    return this._map;
  }
  public set map(value) {
    this._map = value;
  }

  private _code;
  public get code() {
    if ((this._code == null) || (this._code == undefined)) {
      this._code = '';
    }
    return this._code;
  }
  public set code(value) {
    this._code = value;
    try {
      this.geojson = JSON.parse(value);
    }
    catch {
      this.geojson = undefined;
    }
  }

  private _geojson;
  public get geojson() {
    return this._geojson;
  }
  public set geojson(value) {
    this._geojson = value;
    this.extractProperties(value);
  }

  private _features = {
    dictionary: [], //属性字段列表
    geometry: [],   //几何对象列表
    properties: [], //属性记录列表
  }
  public get features() {
    return this._features;
  }

  private extractProperties(geojson) {
    //TODO: 按照表格要求，实现对geojson对象信息的提取，请同学实现

  }

  /**
   *
   */
  constructor() {
    this._code = '';
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
    //TODO: 如何读取geojson文件？请同学们实现

  }

  /**
   *
   */
  public saveFile(filename) {
    //TODO: 如何保存geojson文件？请同学们实现

  }

  /**
   *
   * @param sid
   */
  public location(sid) {
    // console.log(index);
    this.map.locationFeature(sid);
  }
}


