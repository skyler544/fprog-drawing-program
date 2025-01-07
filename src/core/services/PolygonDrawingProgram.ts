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

    console.log(
      "[LeftClick] History: ",
      this.history,
      this.polygonsToString(this.history),
    );

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
    // this.undoHandleEmptyPolygon(currentPolygon);

    if (currentPolygon.length > 0) {
      this.history.push(currentPolygon);
    }

    console.log("[Undo] History: ", this.polygonsToString(this.history));
    console.log("[Undo] RedoStack: ", this.polygonsToString(this.redoStack));

    this.redraw();
  }

  redo(): void {
    if (this.redoStack.length === 0) {
      return;
    }

    const currentRedoPolygon = this.currentPolygon(this.redoStack);
    this.redoLastPoint(currentRedoPolygon);
    this.redoHandleEmptyPolygon(currentRedoPolygon);
    this.redoStack.push(currentRedoPolygon);

    console.log(
      "[Redo] History: ",
      this.history,
      this.polygonsToString(this.history),
    );
    console.log(
      "[Redo] RedoStack: ",
      this.redoStack,
      this.polygonsToString(this.redoStack),
    );

    this.redraw();
  }

  private polygonsToString(points: Point[][]): string {
    return points
      .map((row) => row.map((point) => `(${point.x}, ${point.y})`).join(", "))
      .join("'\n'");
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
    return history.pop() as Point[];
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
      // this.redoStack.push([]);
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
