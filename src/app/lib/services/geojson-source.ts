
import GeoJSON from '@mapbox/geojson-types';
import normalize from '@mapbox/geojson-normalize';
import beautify from 'js-beautify';
import { v4 as uuidv4 } from 'uuid';

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import * as format from 'ol/format/GeoJSON';

// import Circle from 'ol/geom/Circle';
// import Feature from 'ol/Feature';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

// GeoJson图层地图样式
const image = new CircleStyle({
  radius: 2,
  fill: new Fill({ color: 'red' }),
  stroke: new Stroke({ color: 'red', width: 1 }),
});

const styles = {
  'Point': new Style({
    image: image,
  }),
  'LineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiLineString': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
  }),
  'MultiPoint': new Style({
    image: image,
  }),
  'MultiPolygon': new Style({
    stroke: new Stroke({
      color: 'green',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'green',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'GeometryCollection': new Style({
    stroke: new Stroke({
      color: 'magenta',
      width: 2,
    }),
    fill: new Fill({
      color: 'magenta',
    }),
    image: new CircleStyle({
      radius: 10,
      fill: null,
      stroke: new Stroke({
        color: 'magenta',
      }),
    }),
  }),
  'Circle': new Style({
    stroke: new Stroke({
      color: 'red',
      width: 2,
    }),
    fill: new Fill({
      color: 'rgba(255,0,0,0.2)',
    }),
  }),
};

const styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

/**
 * geojson 转 string
 * @param geojson
 * @param pretty
 * @returns
 */
export function GeoJSON2String(geojson: GeoJSON, pretty: boolean = false): string {
  //TODO: 如何将 geojson 对象转为 geojson 字符串，请同学们实现

  return '';
}

/** string 转 GeoJSON */
export function String2GeoJSON(json: string): GeoJSON {
  //TODO: 如何将 json 字符串 转为 geojson 对象，请同学们实现

  return null;
}

/**
 * GeoJson对象服务
 */
export class GeoJsonSource {
  /**
   * 对象唯一标识
   */
  private _oid = uuidv4();
  public get oid() {
    return this._oid;
  }

  /**
   * 数据源名称
   */
  private _name: string;
  public get name() {
    return this._name;
  }
  public set name(value) {
    this._name = value;
  }

  /**
   * 构造函数
   */
  public constructor(geojson?: string) {
    this._maplayer = new VectorLayer({
      style: styleFunction,
    });
    this.geojson_string = geojson;
  }

  private _geojson_string;
  public get geojson_string() {
    if ((this._geojson_string == null) || (this._geojson_string == undefined)) {
      this._geojson_string = '';
    }
    return this._geojson_string;
  }
  public set geojson_string(value) {
    this._geojson_string = value;
    this.fromString(this._geojson_string);
  }

  /**
   * geojson 对象
   */
  private _geojson;
  public get geojson() {
    return this._geojson;
  }
  private set geojson(value: null | GeoJSON) {
    this._geojson = normalize(value);
    this.extractProperties();
    this.setMapLayerSource();
  }

  /**
   * 特征要素集
   */
  private _features = {
    dictionary: [], //属性字段列表
    geometry: [],   //几何对象列表
    properties: [], //属性记录列表
  }
  public get features() {
    return this._features;
  }

  /**
   * 地图图层
   */
  private _maplayer
  public get maplayer() {
    return this._maplayer;
  }
  /**
   * 矢量数据源
   */
  private _mapsource = null;

  /**
   * 基于url获取字符串创建 geojson 对象
   * @param url
   */
  public fromUrl(url: string) {
    //TODO: 如何基于url获取字符串创建 geojson 对象， 请同学们实现

  }

  /**
   * geojson 字符串转 geojson 对象
   * @param json
   */
  private fromString(json: string) {
    //TODO: 如何将 json 字符串 转为 geojson 对象，请同学们实现

  }

  /**
   * geojson 对象 转 geojson 字符串
   * @param pretty
   * @returns
   */
  public toString(pretty: boolean = false): string {
    //TODO: 如何将 geojson 对象转为 geojson 字符串，请同学们实现

    return '';
  }

  /**
   * 打开文件
   * @param file
   */
  public openFile(file: File) {
    //TODO: 如何读取geojson文件？请同学们实现

  }

  /**
   * 保存文件
   */
  public saveFile(filename, pretty: boolean = true) {
    //TODO: 如何保存geojson文件？请同学们实现

  }

  /**
   * 定位要素
   * @param sid
   */
  public getFeatureBySid(sid) {
    //TODO: 根据sid查找要素的几何属性，请同学们实现

  }

  /**
   * 提取特征数据
   */
  private extractProperties() {
    //TODO: 按照表格要求，实现对geojson对象信息的提取，请同学实现

  }

  /**
   * 设置地图图层数据源
   */
  private setMapLayerSource() {
    //TODO: 设置矢量图层的数据源，实现数据源更新，请同学实现

  }
}
