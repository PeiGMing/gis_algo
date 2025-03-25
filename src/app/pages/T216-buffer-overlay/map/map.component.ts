import { Component, OnDestroy, OnInit } from '@angular/core';
import { GUI } from 'dat.gui';
import { GeoJSON2String } from 'src/app/lib/services/geojson-source';
import { click } from 'ol/events/condition';    //导入点击事件
import Select from 'ol/interaction/Select';       //导入选择交互工具（openlayers中的方法）
import { setUserProjection, useGeographic } from 'ol/proj';
import Map from 'ol/Map';
import View from 'ol/View';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import TDTLayerFactory from '../../../lib/ol/layer/tdt-layer-factory';
import TDTSourceFactory from '../../../lib/ol/source/tdt-source-factory';

import { BufferOverlayService } from '../buffer-overlay.service';

import { environment } from 'src/environments/environment';

const token = environment.common.tdt.token;

@Component({
  selector: 't216-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit,OnDestroy {

  public map: Map;
  private map_view;
  private tdt_img_c_layer;
  private tdt_anno_C_layer;

  private gui: GUI;

  private _locationFeatureSubscription;
  private _loadFileSubscription;
  //定义选择交互工具
  private _select: Select;

  constructor(private service: BufferOverlayService) {
    this.tdt_img_c_layer = TDTLayerFactory.tdt_vec_c_layer(token);
    this.tdt_anno_C_layer = TDTLayerFactory.tdt_cva_c_layer(token);
    this._locationFeatureSubscription = this.service.locationFeature.subscribe((value) => {
      this.onLocationFeature(value);
    });
   }


    /**
   *
   * @param sid
   */
  public onLocationFeature(sid) {
    const feature = this.service.activeSource.getFeatureBySid(sid);
    this._select.getFeatures().clear();       //清除选择
    this._select.getFeatures().push(feature); 
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


  ngOnInit(): void {
    this.initMap();
    this.initDatGUI();
    this.map.addLayer(this.service.landuse.maplayer);
    this.map.addLayer(this.service.soil.maplayer);
    this.map.addLayer(this.service.sewers.maplayer);
    this.map.addLayer(this.service.candidate.maplayer);
  }

  ngOnDestroy(): void {
    // 移除Dat.GUI
    this.removeDatGUI();
    this._locationFeatureSubscription.unsubscribe();
  }

  private readonly options = {
    message: '天地图',
    landuse: true,
    soil: true,
    sewers: true,
    candidate: true,
    editLayer: 'landuse',
    sewersBuffer: 300
  };

  private initDatGUI() {

    this.gui = new GUI({ name: '天地图' });
    this.gui.add(this.options, 'message');
    this.gui.add(this.options, 'landuse').listen().onChange((value) => {
      this.service.setLanduseDisplay(value);
    });
    this.gui.add(this.options, 'soil').listen().onChange((value) => {
      this.service.setSoilDisplay(value);
    });
    this.gui.add(this.options, 'sewers').listen().onChange((value) => {
      this.service.setSewersDisplay(value);  
    });
    this.gui.add(this.options, 'candidate').listen().onChange((value) => {
      this.service.setCandidateDisplay(value);
    });
    this.gui.add(this.options, 'editLayer', ['landuse', 'soil', 'sewers', 'candidate']).onFinishChange((value) => {
      this.service.setActiveSource(value);
    });
    this.gui.add(this.options, 'sewersBuffer').min(0).max(500).step(10).listen().onChange((value) => {
      this.options.sewersBuffer = value
      this.service.serwers_buffer_radius = value;
    });

    // 添加dat.gui到容器
    const t = this.gui.domElement;//HTML节点文档获取
    document.getElementById('t216-ol-datgui').appendChild(t);  

  }

  private removeDatGUI() {
    const t = this.gui.domElement;
    t.remove();
  }

  private initMap() {
    //TODO: 设置空间参考
    //useGeographic();
    setUserProjection('EPSG:4326');

    this.map_view = new View({
      center: [112.557405, 0.054056],
      zoom: 1,
    });
    this.map = new Map({
      target: 't216-ol-map',
      layers: [this.tdt_img_c_layer, this.tdt_anno_C_layer],
      view: this.map_view
    });

    this._select = new Select({
      condition: click,
      style: new Style({
        stroke: new Stroke({
          color: 'red',
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
