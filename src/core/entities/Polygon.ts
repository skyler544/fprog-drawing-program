import { Point } from "./Point.js";

export class Polygon {
  private points: Point[] = [];
  private redoStack: Point[] = [];

  getPoints(): Point[] {
    return this.points;
  }

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
}
