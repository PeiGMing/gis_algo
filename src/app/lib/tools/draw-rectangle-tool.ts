import { AbstractTool } from "./abstract-tool";

export class DrawRectangleTool extends AbstractTool {

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
    this.ctx.moveTo(this._startPoint.x, this._startPoint.y);
    this.ctx.lineTo(this.mouseMove.x, this._startPoint.y);
    this.ctx.lineTo(this.mouseMove.x, this.mouseMove.y);
    this.ctx.lineTo(this._startPoint.x, this.mouseMove.y);
    this.ctx.lineTo(this._startPoint.x, this._startPoint.y);

    this.ctx.lineWidth = this.options['lineWidth'];
    this.ctx.strokeStyle = this.options['strokeStyle'];
    this.ctx.fillStyle = this.options['fillStyle'];
    this.ctx.stroke();
    this.ctx.fill();
    this.ctx.restore();
  }

}
