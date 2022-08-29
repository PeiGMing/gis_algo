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
  }
  onmousemove(event: MouseEvent) {
    super.onmousemove(event);

    //TODO: 请同学们实现
  }

}
