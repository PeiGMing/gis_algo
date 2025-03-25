import { Component, OnInit, OnDestroy } from '@angular/core';
import { GUI } from 'dat.gui';
import { click } from 'ol/events/condition';    //导入点击事件
import Select from 'ol/interaction/Select';       //导入选择交互工具（openlayers中的方法）
import { clearUserProjection, fromLonLat, setUserProjection, useGeographic } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import TDTLayerFactory from '../../../lib/ol/layer/tdt-layer-factory';
import TDTSourceFactory from '../../../lib/ol/source/tdt-source-factory';

import { MapMeasureService } from '../map-measure.service';

import { environment } from 'src/environments/environment';

// 天地图 Token
const token = environment.common.tdt.token;

@Component({
  selector: 't204-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {

  public map: Map;
  private map_view;
  private tdt_img_c_layer;
  private tdt_anno_C_layer;

  private gui: GUI;

  private _locationFeatureSubscription;
  //定义选择交互工具
  private _select: Select;
  
  constructor(private service: MapMeasureService) {
    this.tdt_img_c_layer = TDTLayerFactory.tdt_vec_c_layer(token);
    this.tdt_anno_C_layer = TDTLayerFactory.tdt_cva_c_layer(token);
    this._locationFeatureSubscription = this.service.locationFeature.subscribe((value) => {
      this.onLocationFeature(value);
    });
   }

  ngOnInit(): void {
    this.initMap();
    this.initDatGUI();
    this.map.addLayer(this.service.source.maplayer);
  }

  ngOnDestroy(): void {
    // 移除Dat.GUI
    this.removeDatGUI();
    this._locationFeatureSubscription.unsubscribe();
  }

  /**
   *
   * @param sid
   */
   public onLocationFeature(sid) {
    const feature = this.service.source.getFeatureBySid(sid);
    this._select.getFeatures().clear();       //清除选择
    this._select.getFeatures().push(feature);     //将定位对象放入选择集中
    const geo = feature.getGeometry();
    this.zoomToGeometry(geo);
  }

  /**
   * 定位要素
   * @param sid
   */
   public zoomToGeometry(geo) {
    if ((geo == null) || (geo == undefined)) {
      return;
    }
    this.map_view.fit(geo, { padding: [170, 170, 170, 170], minResolution: 50 });
  }

  private removeDatGUI() {
    const t = this.gui.domElement;
    t.remove();
  }

  private readonly options = {
    message: '天地图',
    display: true,
    basemap: 'vector',
  };
  private initDatGUI() {
    this.gui = new GUI({ name: 'TDT' });
    this.gui.add(this.options, 'message');
    this.gui.add(this.options, 'display').onFinishChange((value) => {
      this.service.setDisplay(value);
    });
    this.gui.add(this.options, 'basemap', ['vector', 'images']).onFinishChange((value) => {
      if (value === 'images') {
        this.tdt_img_c_layer.setSource(TDTSourceFactory.tdt_img_w_source(token));
        this.tdt_anno_C_layer.setSource(TDTSourceFactory.tdt_cia_w_source(token));
      } else {
        this.tdt_img_c_layer.setSource(TDTSourceFactory.tdt_vec_w_source(token));
        this.tdt_anno_C_layer.setSource(TDTSourceFactory.tdt_cva_w_source(token));
      }
    });

    // 添加dat.gui到容器
    const t = this.gui.domElement;
    document.getElementById('t204-ol-datgui').appendChild(t);
  }
  private initMap() {

    //TODO: 设置空间参考
    //useGeographic();
    setUserProjection('EPSG:4326');

    this.map_view = new View({
      center: fromLonLat([150, 0]),
      zoom: 1,
    });
    this.map = new Map({
      target: 't204-ol-map',
      layers: [this.tdt_img_c_layer, this.tdt_anno_C_layer],
      view: this.map_view
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
