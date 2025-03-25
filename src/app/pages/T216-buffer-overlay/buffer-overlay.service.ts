import { EventEmitter, Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import * as turf from '@turf/turf';
import { GeoJSON2String, GeoJsonSource, String2GeoJSON } from 'src/app/lib/services/geojson-source';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BufferOverlayService { 
  /**
   * feature 定位事件
   */
  locationFeature: EventEmitter<any> = new EventEmitter();
  /**
   * 加载文件数据
   */
  loadFile: EventEmitter<any> = new EventEmitter();

  private _landuse: GeoJsonSource;
  public get landuse() {
    return this._landuse;
  }
  public setLanduseDisplay(visible: boolean) {
    this._landuse.maplayer.setVisible(visible);
  }

  private _sewers: GeoJsonSource;
  public get sewers() {
    return this._sewers;
  }
  public setSewersDisplay(visible: boolean) {
    this._sewers.maplayer.setVisible(visible);
  }
  
  private _soil: GeoJsonSource;
  public get soil() {
    return this._soil;
  }
  public setSoilDisplay(visible: boolean) {
    this._soil.maplayer.setVisible(visible);
  }

  private _candidate: GeoJsonSource;
  public get candidate() {
    return this._candidate;
  }
  public setCandidateDisplay(visible: boolean) {
    this._candidate.maplayer.setVisible(visible);
  }

  private _activeSource: GeoJsonSource;
  public get activeSource() {
    return this._activeSource;
  }

  public setActiveSource(name: string) {
    switch (name) {
      case 'landuse':
        this._activeSource = this._landuse;
        break;
      case 'sewers':
        this._activeSource = this._sewers ; 
        break; 
      case 'soil':
        this._activeSource = this._soil ;
        break; 
      case 'candidate':
        this._activeSource = this._candidate ;
        break;
      default:
        this._activeSource = this._candidate;
        break;
    }
  }

  private _serwers_buffer_radius = 300.0;
  public get serwers_buffer_radius() {
    return this._serwers_buffer_radius;
  }
  
  public set serwers_buffer_radius(value) {
    this._serwers_buffer_radius = value ;
  }

  constructor() {
    this._landuse = new GeoJsonSource();
    this._sewers = new GeoJsonSource();
    this._soil = new GeoJsonSource();
    this._candidate = new GeoJsonSource();

    this.downloadFile();
   }

   /**
   *
   * @returns
   */
  public createFileName() {
    return uuidv4() + '.json';
  }

  public downloadFile() {
    this._landuse.fromUrl(environment.t216_buffer_overlay.landuse_url) ;
    this._sewers.fromUrl(environment.t216_buffer_overlay.severs_url) ;
    this._soil.fromUrl(environment.t216_buffer_overlay.soil_url);
    this._candidate.geojson_string = '';
    this._activeSource = this._landuse;
  }

  public saveFile(filename) {
    this.activeSource.saveFile(filename);
  }

  /**
   * 选址分析
   */
  public overlay() {
    const landuseFeature = this.unionPolygon(this.selectLanduse(this.landuse.geojson));
    const soilFeature = this.unionPolygon(this.selectSoil(this.soil.geojson));
    const sewerBuffer = turf.buffer(this.sewers.geojson, this.serwers_buffer_radius, { units: 'meters' });
    const sewersFeature = this.unionPolygon(this.selectSewers(sewerBuffer));
    let intersection = turf.intersect(landuseFeature, soilFeature);
    intersection = turf.intersect(intersection, sewersFeature);
    this.candidate.geojson_string = GeoJSON2String(intersection, true);
  }
  
  private selectLanduse(geojson) {
    const features = [];
    geojson.features.forEach(feature => {
      if (feature.properties['LUCODE'] == 300) {
        features.push(feature);
      }
    });
    return features;     
}    

  private selectSoil(geojson) {
    const features = [];
    geojson.features.forEach(feature => {
      if (feature.properties['SUIT'] >= 2) {
        features.push(feature);
      }
    });
    return features;  
  }    

  private selectSewers(geojson) {
    const features = [];
    geojson.features.forEach(feature => {  
        features.push(feature);   
    });
    return features;  
  }    

  private unionPolygon(geojson) {
    let unionPolygon = geojson[0] 
    geojson.forEach(feature => {  
      unionPolygon = turf.union(unionPolygon, feature)
    });
    return unionPolygon; 
  }
}
