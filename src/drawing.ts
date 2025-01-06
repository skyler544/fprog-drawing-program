import { Point } from "./point.js";

export class DrawingProgram {
  private ctx: CanvasRenderingContext2D;
  private radius = 4;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  leftClick(point: Point) {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2);

    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
