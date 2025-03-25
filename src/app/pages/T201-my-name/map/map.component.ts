import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

import { GUI } from 'dat.gui';

import { setUserProjection, useGeographic } from 'ol/proj';

import Map from 'ol/Map';
import View from 'ol/View';
// import TileLayer from 'ol/layer/Tile';
import Select from 'ol/interaction/Select';       //导入选择交互工具（openlayers中的方法）
import VectorLayer from 'ol/layer/Vector';

// import Circle from 'ol/geom/Circle';
// import Feature from 'ol/Feature';
import GeoJSON from 'ol/format/GeoJSON';
import VectorSource from 'ol/source/Vector';
import { click } from 'ol/events/condition';    //导入点击事件
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

import TDTLayerFactory from '../../../lib/ol/layer/tdt-layer-factory';
import TDTSourceFactory from '../../../lib/ol/source/tdt-source-factory';

import { MyNameService } from '../my-name.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { feature } from '@turf/turf';

// 天地图 Token
const token = environment.common.tdt.token;

// GeoJson图层地图样式
const image = new CircleStyle({
  radius: 5,
  fill: null,
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
      color: 'yellow',
      width: 1,
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 0, 0.1)',
    }),
  }),
  'Polygon': new Style({
    stroke: new Stroke({
      color: 'blue',
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: 'rgba(0, 0, 255, 0.1)',
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
  return styles[feature.getGeometry().getType()];//获取geojson中的几何类型（MultiPolygon）
};

@Component({
  selector: 't201-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy  {

  private map;
  private map_view;
  private tdt_img_c_layer;
  private tdt_anno_c_layer;
  private geojson_layer;

  private geojson_source;

  private gui: GUI;

  private _geojson = undefined;

  //定义选择交互工具
  private _select: Select;

  @Input()
  public get geojson() {
    return this._geojson;
  }
  public set geojson(value) {
    this._geojson = value;

    //TODO: 矢量图层数据源是如何更新的？
    this.geojson_layer.setSource(undefined);
    if (value != undefined) {
      this.geojson_source = new VectorSource({
        features: new GeoJSON().readFeatures(value),
      });
      this.geojson_layer.setSource(this.geojson_source);
    }
  }

  //定位对象
  public onLocationFeature(sid) {
    if ((this.geojson === undefined) || (sid < 0)) {
      return;
    }
    let target_feature
    const features = this.geojson_source.getFeatures();
    features.forEach(feature => {
      const id = feature.getProperties()['sid'];
      if (id == sid) {
        target_feature = feature;
      }  
    });
    this._select.getFeatures().clear();       //清除选择
    this._select.getFeatures().push(target_feature);     //将定位对象放入选择集中
    const geo = target_feature.getGeometry();
    this.zoomToGeometry(geo);     //缩放至定位对象
  }

  /**
   * 定位要素
   * @param sid
   */
  //缩放至定位对象
  public zoomToGeometry(geo) {
    if ((geo == null) || (geo == undefined)) {
      return;
    }
    this.map_view.fit(geo, {padding: [170, 170, 170, 170], minResolution: 50});
  }

  constructor(private service: MyNameService) { 
    //TODO: 这句话是什么含义？
    this.service.map = this;

    this.tdt_img_c_layer = TDTLayerFactory.tdt_vec_c_layer(token);
    this.tdt_anno_c_layer = TDTLayerFactory.tdt_cva_c_layer(token);
    //TODO: 矢量图层是如何创建的？
    //TODO: 地图图层样式是如何定义的？
    this.geojson_layer = new VectorLayer({
      style: styleFunction,
    });
  }

  ngOnInit(): void {
    this.initMap();

    this.initDatGUI();
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
    // 移除Dat.GUI
    this.removeDatGUI();
  }
  
  private initDatGUI() {
    const options = {
      message: '天地图',
      basemap: 'vector',
    };
    this.gui = new GUI({ name: 'TDT' });
    this.gui.add(options, 'message');
    this.gui.add(options, 'basemap', ['vector', 'images']).onFinishChange((value) => {
      //TODO: 栅格图层数据源是如何更新的？
      if (value === 'images') {
        this.tdt_img_c_layer.setSource(TDTSourceFactory.tdt_img_c_source(token));
        this.tdt_anno_c_layer.setSource(TDTSourceFactory.tdt_eia_c_source(token));
      } else {
        this.tdt_img_c_layer.setSource(TDTSourceFactory.tdt_vec_c_source(token));
        this.tdt_anno_c_layer.setSource(TDTSourceFactory.tdt_cva_c_source(token));
      }
    });

    // 添加dat.gui到容器
    const t = this.gui.domElement;
    document.getElementById('t201-ol-datgui').appendChild(t);
  }

    private removeDatGUI() {
      const t = this.gui.domElement;
      t.remove();
    }

    private initMap() {

      //设置空间参考
      //useGeographic();
      setUserProjection('EPSG:4326'); //经纬度
  
      //TODO: 地图初始化剩余部分完成，请同学们实现
      this.map_view = new View({ //地图视窗，中心点150，0
        center:[150, 0],
        zoom: 1,
      });
      this.map = new Map({
        target: 't201-ol-map',
        layers: [this.tdt_img_c_layer, this.tdt_anno_c_layer, this.geojson_layer],
        view: this.map_view//map的性质、容器    图层：影像、注记  看哪一部分
    
      });
      //初始化选择样式
      this._select = new Select({
        condition: click,
        style: new Style({
          stroke: new Stroke({
            color: 'cyan',
            width: 5,
          }),
          fill: new Fill({
          color: 'rgba(255, 255, 255, 0.1)',
      }),
    })
  });
  this.map.addInteraction(this._select);

}
    
  
}
