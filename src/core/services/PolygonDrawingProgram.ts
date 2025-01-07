import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class PolygonDrawingProgram implements IDrawingProgram {
  private ctx: CanvasRenderingContext2D;

  private history: Point[][] = [];
  private redoStack: Point[][] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  leftClick(point: Point) {
    const currentPolygon = this.currentPolygon(this.history) ?? [];
    currentPolygon.push(point);
    this.history.push(currentPolygon);

    this.redoStack = [];
    this.redraw();
  }

  doubleClick(): void {
    this.history.push([]);
    this.redraw();
  }

  undo(): void {
    if (this.history.length === 0) {
      return;
    }

    const currentPolygon = this.currentPolygon(this.history);
    this.undoLastPoint(currentPolygon);
    this.undoHandleEmptyPolygon(currentPolygon);

    this.redraw();
  }

  redo(): void {
    if (this.redoStack.length === 0) {
      return;
    }

    const currentRedoPolygon = this.currentPolygon(this.redoStack);
    this.redoLastPoint(currentRedoPolygon);
    this.redoHandleEmptyPolygon(currentRedoPolygon);

    this.redraw();
  }

  private redraw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.history.forEach((polygon) => {
      this.drawPolygon(polygon);
    });
  }

  private drawPolygon(polygon: Point[]) {
    if (polygon.length < 2) {
      return;
    }
    this.ctx.beginPath();
    this.ctx.moveTo(polygon[0].x, polygon[0].y);

    for (let i = 1; i < polygon.length; i++) {
      const point = polygon[i];
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }

  private currentPolygon(history: Point[][]): Point[] {
    return history[history.length - 1];
  }

  private undoLastPoint(polygon: Point[]): void {
    const lastPoint = polygon.pop();

    if (lastPoint) {
      const currentRedoPolygon = this.currentPolygon(this.redoStack) ?? [];

      currentRedoPolygon.push(lastPoint);
      this.redoStack.push(currentRedoPolygon);
    }
  }

  private undoHandleEmptyPolygon(polygon: Point[]) {
    if (polygon.length === 0) {
      this.history.pop();
      this.redoStack.push([]);
    }
  }

  private redoLastPoint(polygon: Point[]): void {
    const lastPoint = polygon.pop();

    if (lastPoint) {
      const currentPolygon = this.currentPolygon(this.history) ?? [];

      currentPolygon.push(lastPoint);
      this.history.push(currentPolygon);
    }
  }

  private redoHandleEmptyPolygon(polygon: Point[]) {
    if (polygon.length === 0) {
      this.redoStack.pop();
      this.history.push([]);
    }
  }
}
