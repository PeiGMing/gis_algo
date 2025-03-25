import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';
import { GeodeticQuaternaryCode } from 'src/app/lib/services/geohash/geodetic-quaternary-code';
import { QuaternaryCode } from 'src/app/lib/services/geohash/quaternary-code';
//import { features } from 'process';

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
        if (currentFeature.geometry === undefined) {
          currentFeature.geometry = {};
        }
        
        let row = currentFeature.properties['row'];
        let column = currentFeature.properties['column'];
        let deep = currentFeature.properties['deep'];

        let code = currentFeature.properties['geohash'] = m.encoding(row,column,deep);
        currentFeature.geometry['type'] = 'Polygon';
        let deco = gm.decoding(code);
        currentFeature.geometry['coordinates'] = [[[deco["west"], deco["north"]], [deco["west"], deco["south"]],
            [deco["east"], deco["south"]], [deco["east"], deco["north"]]]];
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
    if (this.source.geojson != null) {
      const geojson = String2GeoJSON(this.source.geojson_string);
      var features = geojson.features;
      var level = Array(features.length).fill(1);
      
      var featuresSet = [];
      var levelSet = [];
      featuresSet.push(features);
      levelSet.push(level);
      var n = Math.log(features.length) / Math.log(4);
      for(var i = 0; i < n; i++)
      {
        var featuresNow = this.mergeOnce(featuresSet[i], levelSet[i])["features"];
        var levelNow = this.mergeOnce(featuresSet[i], levelSet[i])["level"];
        featuresSet.push(featuresNow);
        levelSet.push(levelNow);
      }

      geojson.features = featuresSet[i];
      this.source.geojson_string = GeoJSON2String(geojson, true);
    }
  }

  public mergeOnce(features, level)
  {
    const gm = new GeodeticQuaternaryCode();
    const m = new QuaternaryCode();
    var nfeatures = [];
    var nlevel = [];
    for(var i = 0, j = 0; i < features.length; )
    {
      if(level[j] == 1 && level[j + 1] == 1 && level[j + 2] == 1 && level[j + 3] == 1) {
        let deep = features[i].properties['deep']; 
        
        let coordinates = features[i].geometry['coordinates'];
        let coordinates2 = features[i + 1].geometry['coordinates'];
        let coordinates3 = features[i + 2].geometry['coordinates'];
        let coordinates4 = features[i + 3].geometry['coordinates'];  

        let value = features[i].properties['value'];
        let value2 = features[i + 1].properties['value'];
        let value3 = features[i + 2].properties['value'];
        let value4 = features[i + 3].properties['value'];

        if(value == value2 && value2 == value3 && value3 == value4) {
          var featureNow = features[i];
          featureNow.geometry['coordinates'] = [[coordinates3[0][0], coordinates[0][1], coordinates2[0][2],  coordinates4[0][3]]]; 
          let geohash = featureNow.properties['geohash'] = gm.encoding(coordinates[0][0][0], coordinates[0][0][1], deep - 1);
          featureNow.properties['row'] = m.decoding(geohash)['row']
          featureNow.properties['column'] = m.decoding(geohash)['column']
          featureNow.properties['deep'] = m.decoding(geohash)['deep']
          nfeatures.push(featureNow);
          nlevel.push(1);
          i = i + 4;
          j = j + 4;
        }
        else {
          nfeatures.push(features[i], features[i + 1], features[i + 2], features[i + 3]);
          nlevel.push(4);
          i = i + 4;
          j = j + 4;
        }     
      }
      else {
        var count = level[j] + level[j + 1] + level[j + 2] + level[j + 3];
        for(var z = i, p = 0 ; p < count; p++){
          nfeatures.push(features[z]);
          z = z + 1;
        }
        nlevel.push(count);
        i = i + count;
        j = j + 4;
      }     
    }
    return { features: nfeatures, level: nlevel };
  }
}
