import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class DotDrawingProgram implements IDrawingProgram {
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

  doubleClick(): void {
    throw new Error("Method not implemented.");
  }

  undo(): void {
    throw new Error("Method not implemented.");
  }

  redo(): void {
    throw new Error("Method not implemented.");
  }
}
