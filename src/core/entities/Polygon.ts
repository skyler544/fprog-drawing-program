import { Point } from "./Point.js";

export class Polygon {
  private points: Point[] = [];
  private redoStack: Point[] = [];

  addPoint(point: Point) {
    this.points.push(point);
    this.redoStack = [];
  }

  length() {
    return this.points.length;
  }

  redoStackLength() {
    return this.redoStack.length;
  }

  undo() {
    if (this.points.length === 0) {
      return;
    }

    this.redoStack.push(this.points.pop() as Point);
  }

  redo() {
    if (this.redoStack.length === 0) {
      return;
    }

    this.points.push(this.redoStack.pop() as Point);
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length < 2) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);

    for (let i = 1; i < this.points.length; i++) {
      const point = this.points[i];
      ctx.lineTo(point.x, point.y);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
  }
}
