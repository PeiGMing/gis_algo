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
  }

}
