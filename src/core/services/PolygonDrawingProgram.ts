import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class PolygonDrawingProgram implements IDrawingProgram {
  private ctx: CanvasRenderingContext2D;

  private undoStack: Point[][] = [];
  private redoStack: Point[][] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private redraw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.undoStack.forEach((polygon) => {
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

  leftClick(point: Point) {
    const currentPolygon = this.undoStack[this.undoStack.length - 1];

    if (currentPolygon) {
      currentPolygon.push(point);
    } else {
      this.undoStack.push([point]);
    }

    this.redoStack = [];
    this.redraw();
  }

  doubleClick(): void {
    this.undoStack.push([]);
    this.redraw();
  }

  undo(): void {
    if (this.undoStack.length === 0) {
      return;
    }

    const lastPolygon = this.undoStack[this.polygonStack.length - 1];
    // const lastPoint =
    if (lastPolygon) {
      this.redoStack.push(lastPolygon);
    }

    this.redraw();
  }

  redo(): void {
    if (this.redoStack.length === 0) {
      return;
    }

    const lastPolygon = this.redoStack.pop();
    if (lastPolygon) {
      this.undoStack.push(lastPolygon);
    }

    this.redraw();
  }
}
