import { AbstractTool } from "./abstract-tool";

export class DrawCircleTool extends AbstractTool {

  /**
   * 坐标点集
   */
  private _startPoint;
  private _endPoint;
  /**
   * 用于标识鼠标是否处于拖拽状态，只有拖拽状态才可以进行绘制
   */
  private _dragging = false;
  /**
   *
   * @param canvas
   * @param options
   */
  constructor(canvas: HTMLCanvasElement, options?: {}) {
    super(canvas, options);
  }

  onmousedown(event: MouseEvent) {
    super.onmousedown(event);

    //TODO: 请同学们实现
    if(this._dragging==false)
    {
      this.saveDrawingSurface();
      //标识鼠标处于拖曳状态
      this._dragging = true;
      this._startPoint = this.mouseDown;
    }
    else
    {
      this._endPoint = this.mouseDown;
      this._dragging = false;
    }
  }
  onmousemove(event: MouseEvent) {
    super.onmousemove(event);

    //TODO: 请同学们实现
    if(this._dragging)
    {
      //恢复绘图表面
      this.restoreDrawingSurface();//清除状态
      //绘制线段
      this.draw();
      
    }
  }
  private draw()
  {
    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this._startPoint.x, this._startPoint.y, this.distance(this._startPoint,this.mouseMove),0, 2*Math.PI)
    this.ctx.lineWidth = this.options['lineWidth'];
    this.ctx.strokeStyle = this.options['strokeStyle'];
    this.ctx.fillStyle = this.options['fillStyle'];
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }

  private distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }


}
