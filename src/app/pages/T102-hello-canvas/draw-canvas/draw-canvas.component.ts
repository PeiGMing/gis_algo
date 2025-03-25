import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { GUI } from 'dat.gui';

@Component({
  selector: 't102-draw-canvas',
  templateUrl: './draw-canvas.component.html',
  styleUrls: ['./draw-canvas.component.scss']
})
export class DrawCanvasComponent implements OnInit, AfterViewInit, OnDestroy {

  private el: HTMLCanvasElement; //申明元素
  private ctx: CanvasRenderingContext2D; //获取画布的绘画句柄 Handle资源的控制
  private width; //获取画布的高宽
  private height;
//定义初始化属性
  private options = {  
    message: 'Draw Star',
    radius: 200,
    sr:5,
    rt:3.14,
    strokcolor: '#FFFFFF',
    fillcolor: '#FE0000',
    shadowColor:'#000000',
    // fillcolor: '#FFFF03',
    star: true,
    reset: () => {
      this.options.radius = 200;
      this.options.sr=5;
      this.options.rt=3.14;
      this.options.strokcolor = '#FFFFFF';
      this.options.fillcolor = '#FE0000';
      this.options.shadowColor='#000000';
      // this.options.fillcolor = '#FFFF03';
      this.options.star = true;
      this.draw();
    }
  };

  private gui: GUI;  //GUI本身

  constructor() { }   //构造函数 空

  // 获取窗口变化
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.reset();
    this.draw();
  }
//接口实现
  ngOnInit(): void {
    this.initDatGUI();
  }

  ngAfterViewInit(): void { //准备开始绘制
    this.el = document.getElementById("t102-draw-canvas") as HTMLCanvasElement;  //获取CANVAS要素
    this.reset();

    this.draw();
  }

  ngOnDestroy(): void { //析构

    // 移除Dat.GUI
    this.removeDatGUI();
  }
  //初始化GUI
  private initDatGUI() {

    this.gui = new GUI({ name: 'Draw Star' });
    this.gui.add(this.options, 'message');
    // this.gui.remember(options);
    this.gui.add(this.options, 'star').listen().onChange((value) => {
      this.draw(); //监听变化Draw
    });
    this.gui.add(this.options, 'radius').min(100).max(300).step(10).listen().onChange((value) => {
      this.draw();
    });
    this.gui.add(this.options, 'sr').min(1).max(10).step(1).listen().onChange((value) => {
      this.draw();
    });
    this.gui.add(this.options, 'rt').min(0).max(360).step(5).listen().onChange((value) => {
      this.draw();
    });
    this.gui.addColor(this.options, 'strokcolor').listen().onChange((value) => {
      this.draw();
    });
    this.gui.addColor(this.options, 'fillcolor').listen().onChange((value) => {
      this.draw();
    });
    this.gui.addColor(this.options, 'shadowColor').listen().onChange((value) => {
      this.draw();
    });
    this.gui.add(this.options, 'reset');

    // 添加dat.gui到容器
    const t = this.gui.domElement;//HTML节点文档获取
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
    this.ctx = this.el.getContext('2d'); //获取绘图句柄
  }

  private draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.ctx.save(); //保存
    if (this.options.star) {
      this.drawStar();
    } else {
      this.drawCircle();
    }
    this.ctx.restore();  //恢复 
  }

  private drawCircle() {
    //TODO: 绘制圆，请同学们实现
    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    const radius = this.options.radius;
    let rt = this.options.rt;

    this.ctx.beginPath();
    this.ctx.arc(cx, cy, radius, 0, 2*Math.PI);
    this.ctx.closePath();
    this.ctx.rotate(rt);

    this.ctx.lineWidth = 3;
    this.ctx.strokeStyle = this.options.strokcolor;
    this.ctx.fillStyle = this.options.fillcolor;
    this.ctx.shadowColor=this.options.shadowColor;
    this.ctx.shadowOffsetX=20;
    this.ctx.shadowOffsetY=20;
    this.ctx.shadowBlur = 5;
    this.ctx.stroke();
    this.ctx.fill();
  }

  private drawStar() {
    //TODO: 绘制五角星，请同学们实现
    let bigRadius = this.options.radius;
    let smallRadius = this.options.radius*0.5;
    let n = this.options.sr;
    let rt = this.options.rt;
    let angle = Math.PI / n;

    const cx = this.width * 0.5;
    const cy = this.height * 0.5;
    this.ctx.translate(cx, cy);
    this.ctx.rotate(rt);

    for(let i = 0; i < n; i++){
      const x1 = bigRadius * Math.sin(angle * i * 2);
      const y1 = bigRadius * Math.cos(angle * i * 2);

      const x2 = smallRadius * Math.sin(angle * (i * 2 + 1));
      const y2 = smallRadius * Math.cos(angle * (i * 2 + 1));

      const x3 = bigRadius * Math.sin(angle * (i + 1) * 2);
      const y3 = bigRadius * Math.cos(angle * (i + 1) * 2);

      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(x1, y1);
      this.ctx.lineTo(x2, y2);
      this.ctx.lineTo(x3, y3);
      //this.ctx.lineTo(0, 0);
      this.ctx.closePath();            
      this.ctx.lineWidth = 3;
      this.ctx.strokeStyle = this.options.strokcolor;
      this.ctx.fillStyle = this.options.fillcolor;
      this.ctx.stroke();
      this.ctx.fill();
  
    }


  }

}
