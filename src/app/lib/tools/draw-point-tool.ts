import { AbstractTool } from "./abstract-tool";

export class DrawPointTool extends AbstractTool {
  /**
   *
   */
  private _point;
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
    this._point = this.mouseDown;

    this.ctx.save();
    this.ctx.beginPath();
    this.ctx.arc(this._point.x, this._point.y, 2, 0, 2*Math.PI);

    this.ctx.lineWidth = this.options['lineWidth'];
    this.ctx.strokeStyle = this.options['strokeStyle'];
    this.ctx.stroke();
    this.ctx.restore();

  }

}
