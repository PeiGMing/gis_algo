import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { scale, rotate, skew, translate, compose, applyToPoint, identity } from 'transformation-matrix';

import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';

@Injectable({
  providedIn: 'root'
})
export class TransformService {

  /**
   * feature 定位事件
   */
  locationFeature: EventEmitter<any> = new EventEmitter();
  /**
   * 加载文件数据
   */
  loadFile: EventEmitter<any> = new EventEmitter();

  private _action = '正常';
  public get action() {
    return this._action;
  }
  public set action(value) {
    this._action = value;
    this.apply();
  }

  private _up_and_down = 0;
  public get up_and_down() {
    return this._up_and_down;
  }
  public set up_and_down(value) {
    this._up_and_down = value;
  }

  private _left_and_right = 0;
  public get left_and_right() {
    return this._left_and_right;
  }
  public set left_and_right(value) {
    this._left_and_right = value;
  }

  private _rotate = 0;
  public get rotate() {
    return this._rotate;
  }
  public set rotate(value) {
    this._rotate = value;
  }

  private _scaleX = 1;
  public get scaleX() {
    return this._scaleX;
  }
  public set scaleX(value) {
    this._scaleX = value;
  }

  private _scaleY = 1;
  public get scaleY() {
    return this._scaleY;
  }
  public set scaleY(value) {
    this._scaleY = value;
  }

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

  /**
   *
   */
  constructor() {
    this._source = new GeoJsonSource();
    this._displaySource = new GeoJsonSource();
  }

  /**
   * 生成 DisplaySource
   */
  private buildDisplaySource() {
    //TODO 请同学们完成

  }

  /**
   * 恢复source
   */
  public reset() {
    this.up_and_down = 0;
    this.left_and_right = 0;
    this.rotate = 0;
    this.scaleX = 1;
    this.scaleY = 1;
  }

  /**
   * 应用 变换
   */
  public apply() {
    //TODO 请同学们完成

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
      this.buildDisplaySource();
    };
    reader.readAsText(file, 'utf-8');
  }

  /**
   *
   */
  public saveFile(filename) {
    this.displaySource.saveFile(filename);
  }
}


