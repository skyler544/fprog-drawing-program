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
    // this is a no-op for dot drawing
    return;
  }

  undo(): void {
    if (this.undoStack.length === 0) {
      return;
    }

    this.redoStack.push(this.undoStack.pop() as Point);
    this.redraw();
  }

  redo(): void {
    if (this.redoStack.length === 0) {
      return;
    }

    this.undoStack.push(this.redoStack.pop() as Point);
    this.redraw();
  }
}
