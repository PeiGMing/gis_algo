import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { GUI } from 'dat.gui';

@Component({
  selector: 't102-draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.scss']
})
export class DrawCanvasComponent implements OnInit, AfterViewInit, OnDestroy {

  private el: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private width;
  private height;

  private options = {
    message: 'Draw Star',
    radius: 200,
    strokcolor: '#FFFFFF',
    fillcolor: '#FE0000',
    // fillcolor: '#FFFF03',
    star: true,
    reset: () => {
      this.options.radius = 200;
      this.options.strokcolor = '#FFFFFF';
      this.options.fillcolor = '#FE0000';
      // this.options.fillcolor = '#FFFF03';
      this.options.star = true;
      this.draw();
    }
  };

  private gui: GUI;

  constructor() { }

  // 获取窗口变化
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reset();
    this.draw();
  }

  ngOnInit(): void {
    this.initDatGUI();
  }

  ngAfterViewInit(): void {
    this.el = document.getElementById("t102-draw-canvas") as HTMLCanvasElement;
    this.reset();

    this.draw();
  }

  ngOnDestroy(): void {

    // 移除Dat.GUI
    this.removeDatGUI();
  }

  private initDatGUI() {

    this.gui = new GUI({ name: 'Draw Star' });
    this.gui.add(this.options, 'message');
    // this.gui.remember(options);
    this.gui.add(this.options, 'star').listen().onChange((value) => {
      this.draw();
    });
    this.gui.add(this.options, 'radius').min(100).max(300).step(10).listen().onChange((value) => {
      this.draw();
    });
    this.gui.addColor(this.options, 'strokcolor').listen().onChange((value) => {
      this.draw();
    });
    this.gui.addColor(this.options, 'fillcolor').listen().onChange((value) => {
      this.draw();
    });
    this.gui.add(this.options, 'reset');

    // 添加dat.gui到容器
    const t = this.gui.domElement;
    document.getElementById('t102-draw-canvas-datgui').appendChild(t);
    // 修改 dat.gui 样式
    // t.style.marginTop = '88px';
    // t.style.marginRight = '24px';
    // this.gui.domElement.style = 'margin-top:88px;margin-right:24px';
    // this.gui.domElement.style = 'float:right;';
  }

  private removeDatGUI() {
    const t = this.gui.domElement;
    t.remove();
  }

  private reset() {
    // 重新设置参数
    this.width = this.el.clientWidth;
    this.height = this.el.clientHeight;
    this.el.width = this.width;
    this.el.height = this.height;
    this.ctx = this.el.getContext('2d');
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save();
    if (this.options.star) {
      this.drawStar();
    } else {
      this.drawCircle();
    }
    this.ctx.restore();
  }

  private drawCircle() {
    //TODO: 绘制圆，请同学们实现

  }

  private drawStar() {
    //TODO: 绘制五角星，请同学们实现

  }

}
