import { AbstractTool } from "./abstract-tool";

export class DrawArcTool extends AbstractTool {
  /**
   * 坐标点集
   */
  private _points = [];
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

  /**
   *
   * @param startPoint 开始点坐标
   * @param middlePoint 中间点坐标
   * @param endPoint 结束点坐标
   * @returns 返回圆心坐标和半径
   */
  private create3PointCircle(startPoint, middlePoint, endPoint) {
    //计算三点圆算法
    //Let the three given points be a, b, c.  Use _0 and _1 to represent
    //x and y coordinates. The coordinates of the center p=(p_0,p_1) of
    //the circle determined by a, b, and c are:
    //		p_0 =  ( b_1 a_0^2
    //			    - c_1 a_0^2
    //			    - b_1^2 a_1
    //			    + c_1^2 a_1
    //			    + b_0^2 c_1
    //			    + a_1^2 b_1
    //			    + c_0^2 a_1
    //			    - c_1^2 b_1
    //			    - c_0^2 b_1
    //			    - b_0^2 a_1
    //			    + b_1^2 c_1
    //			    - a_1^2 c_1 )/ D
    //		p_1 =  ( a_0^2 c_0
    //			    + a_1^2 c_0
    //			    + b_0^2 a_0
    //			    - b_0^2 c_0
    //			    + b_1^2 a_0
    //			    - b_1^2 c_0
    //			    - a_0^2 b_0
    //			    - a_1^2 b_0
    //			    - c_0^2 a_0
    //			    + c_0^2 b_0
    //			    - c_1^2 a_0
    //			    + c_1^2 b_0) / D
    //where
    //		D = 2( a_1 c_0 + b_1 a_0 - b_1 c_0 -a_1 b_0 -c_1 a_0 + c_1 b_0 )
    //The radius of the circle is then:
    //		r^2 = (a_0 - p_0)^2 + (a_1 - p_1)^2

    const ax = startPoint.x;
    const ay = startPoint.y;
    const bx = middlePoint.x;
    const by = middlePoint.y;
    const cx = endPoint.x;
    const cy = endPoint.y;

    const s = 2 * (ay * cx + by * ax - by * cx - ay * bx - cy * ax + cy * bx);
    const px = (ax * ax * by - ax * ax * cy - by * by * ay + cy * cy * ay + bx * bx * cy + ay * ay * by + cx * cx * ay - cy * cy * by - cx * cx * by - bx * bx * ay + by * by * cy - ay * ay * cy) / s;
    const py = (ax * ax * cx + ay * ay * cx + bx * bx * ax - bx * bx * cx + by * by * ax - by * by * cx - ax * ax * bx - ay * ay * bx - cx * cx * ax + cx * cx * bx - cy * cy * ax + cy * cy * bx) / s;
    const r = Math.sqrt((ax - px) * (ax - px) + (ay - py) * (ay - py));
    return { x: px, y: py, r: r }
  }

  /**
   *
   * @param startPoint 开始点坐标
   * @param middlePoint 中间点坐标
   * @param endPoint 结束点坐标
   * @returns 返回弧段逆时针反向的开始位置和结束位置，弧段所在圆的圆心和半径
   */
  private create3PointArc(startPoint, middlePoint, endPoint) {
    const c = this.create3PointCircle(startPoint, middlePoint, endPoint);
    let a1 = Math.atan2(startPoint.y - c.y, startPoint.x - c.x);
    let a2 = Math.atan2(middlePoint.y - c.y, middlePoint.x - c.x);
    let a3 = Math.atan2(endPoint.y - c.y, endPoint.x - c.x);

    let startAngle, endAngle;
    if (a1 < 0) {
      a1 += 2 * Math.PI;
    }
    if (a3 < 0) {
      a3 += 2 * Math.PI;
    }
    if (a2 < 0) {
      a2 += 2 * Math.PI;
    }

    if ((a1 - a2) * (a3 - a2) > 0) {
      if (a1 > a3) {
        startAngle = a1;
        endAngle = a3 + 2 * Math.PI;
      }
      else {
        startAngle = a3;
        endAngle = a1 + 2 * Math.PI;
      }
    }
    else {
      if (a1 > a3) {
        startAngle = a3;
        endAngle = a1;
      }
      else {
        startAngle = a1;
        endAngle = a3;
      }
    }

    return {
      x: c.x,
      y: c.y,
      radius: c.r,
      startAngle: startAngle,
      endAngle: endAngle
    };
  }
}

