import { Point } from "../entities/Point.js";
import { Polygon } from "../entities/Polygon.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class PolygonDrawingProgram implements IDrawingProgram {
  private ctx: CanvasRenderingContext2D;

  private undoStack: Polygon[] = [];
  private redoStack: Polygon[] = [];

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  private redraw() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.undoStack.forEach((polygon) => {
      polygon?.draw(this.ctx);
    });
  }

  leftClick(point: Point) {
    const currentPolygon = this.undoStack.pop() ?? new Polygon();
    currentPolygon.addPoint(point);
    this.undoStack.push(currentPolygon);

    this.redoStack = [];
    this.redraw();
  }

  doubleClick(): void {
    this.undoStack.push(new Polygon());
    return;
  }

  undo(): void {
    if (this.undoStack.length === 0) {
      return;
    }

    const currentPolygon = this.undoStack.pop() as Polygon;
    currentPolygon.undo();

    if (currentPolygon.length() === 0) {
      this.redoStack.push(currentPolygon);
    } else {
      this.undoStack.push(currentPolygon);
    }

    this.redraw();
  }

  redo(): void {
    if (this.innerRedo()) {
      return;
    }

    const currentRedoPolygon = this.redoStack.pop() as Polygon;

    if (currentRedoPolygon) {
      currentRedoPolygon.redo();
      this.undoStack.push(currentRedoPolygon);
    }

    this.redraw();
  }

  private innerRedo(): boolean {
    const currentPolygon = this.undoStack.pop() as Polygon;
    let returnValue = false;

    if (currentPolygon) {
      if (currentPolygon.redoStackLength() > 0) {
        currentPolygon.redo();
        returnValue = true;
      }
      this.undoStack.push(currentPolygon);
    }

    this.redraw();
    return returnValue;
  }
}
