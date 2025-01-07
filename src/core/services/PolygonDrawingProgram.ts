import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class PolygonDrawingProgram implements IDrawingProgram {
  private ctx: CanvasRenderingContext2D;

  // private currentPolygon: Point[] = [];

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

  private currentPolygon(stack: Point[][]): Point[] {
    return stack[stack.length - 1];
  }

  leftClick(point: Point) {
    const currentPolygon = this.currentPolygon(this.undoStack);

    if (currentPolygon) {
      currentPolygon.push(point);
    } else {
      this.undoStack.push([point]);
    }

    this.redoStack = [];
    this.redraw();
  }

  doubleClick(): void {
    this.undoStack.push([]); // check this for cleanliness
    this.redraw();
  }

  undo(): void {
    if (this.undoStack.length === 0) {
      // could go up to the input handler? hide the undo/redo buttons if they can't be used
      return;
    }

    // 1. get the polygon we're currently drawing
    const currentPolygon = this.currentPolygon(this.undoStack);
    // 2. pop whatever point was added last
    const lastPoint = currentPolygon.pop();

    // 3. get or create a polygon in the redo stack
    const currentRedoPolygon = this.currentPolygon(this.redoStack) ?? [];

    console.log("lastPoint", lastPoint);
    console.log("currentRedoPolygon", currentRedoPolygon);

    if (lastPoint) {
      // make a dedicated method
      // 4. if we have a last point, add it to the current redo polygon
      currentRedoPolygon.push(lastPoint);
      // 5. push the current redo polygon to the redo stack
      this.redoStack.push(currentRedoPolygon);
    }

    // 6. if the current polygon is empty, pop it from the undo stack
    // and put a new empty polygon in the redo stack
    if (currentPolygon.length === 0) {
      this.undoStack.pop();
      this.redoStack.push([]);
    }

    this.redraw();
  }

  redo(): void {
    if (this.redoStack.length === 0) {
      return;
    }

    const currentRedoPolygon = this.currentPolygon(this.redoStack);
    const lastPoint = currentRedoPolygon.pop();

    const currentPolygon = this.currentPolygon(this.undoStack) ?? [];

    if (lastPoint) {
      // check if this works with references, and if so stop doing that
      currentPolygon.push(lastPoint);
      this.undoStack.push(currentPolygon);
    }

    if (currentRedoPolygon.length === 0) {
      this.redoStack.pop();
      this.undoStack.push([]);
    }

    // if (currentRedoPolygon) {
    // this.undoStack.push(currentRedoPolygon);
    // }

    // const lastPolygon = this.redoStack.pop();
    // if (lastPolygon) {
    // this.undoStack.push(lastPolygon);
    // }

    this.redraw();
  }
}
