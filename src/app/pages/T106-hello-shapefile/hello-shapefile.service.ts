import { Injectable } from '@angular/core';

import { v4 as uuidv4 } from 'uuid';

import * as shapefile from 'shapefile';
import beautify from 'js-beautify';

@Injectable({
  providedIn: 'root'
})
export class HelloShapefileService {

  private _code;
  public get code() {
    if ((this._code == null) || (this._code == undefined)) {
      this._code = '';
    }
    return this._code;
  }
  public set code(value) {
    this._code = value;
    this.geojson = JSON.parse(value);
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

  private extractProperties(value) {
    //TODO: 按照表格要求，实现对geojson对象信息的提取，请同学实现

  }


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
  public openShapefile(shp: File, dbf?: File) {
    //TODO: 如何基于异步打开多个文件？请同学们实现
    //TODO: 如何读取shp和dbf文件？请同学们实现


  }

  public openGeoJson(file: File) {
     //TODO: 如何读取geojson文件？请同学们实现

  }

  /**
   *
   */
  public saveFile(filename) {
    //TODO: 如何保存geojson文件？请同学们实现

  }

  private shapefile2geojson(shpbuf, dbfbuf?) {
    //TODO: 如何调取 shapefile 包 实现数据geojson的转换？ 请同学们实现
    //TODO: 如何调取 beautify 包 实现geojson文本格式美化？ 请同学们实现

  }

}
