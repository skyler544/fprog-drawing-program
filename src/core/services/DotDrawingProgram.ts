import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class DotDrawingProgram implements IDrawingProgram {
  private ctx: CanvasRenderingContext2D;
  private radius = 4;

  private undoStack: Point[] = [];
  private redoStack: Point[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private redraw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.undoStack.forEach((point) => {
      this.drawDot(point);
    });
  }

  private drawDot(point: Point) {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2);

    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
  }

  leftClick(point: Point) {
    this.undoStack.push(point);
    this.redoStack = [];

    this.redraw();
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
