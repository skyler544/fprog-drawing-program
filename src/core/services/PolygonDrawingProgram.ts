import { Point } from "../entities/Point.js";
import { Polygon } from "../entities/Polygon.js";

export const PolygonDrawingProgram = (
  drawingService: (polygons: Polygon[]) => void,
) => {
  const undoStack: Polygon[] = [];
  const redoStack: Polygon[] = [];

  const redraw = () => {
    drawingService(undoStack);
  };

  const leftClick = (point: Point) => {
    const currentPolygon = undoStack.pop() ?? new Polygon();
    currentPolygon.addPoint(point);
    undoStack.push(currentPolygon);

    emptyRedoStack();
    redraw();
  };

  const emptyRedoStack = () => {
    while (redoStack.length > 0) {
      redoStack.pop();
    }
  };

  const doubleClick = () => {
    undoStack.push(new Polygon());
    return;
  };

  const undo = () => {
    if (undoStack.length === 0) {
      return;
    }

    const currentPolygon = undoStack.pop() as Polygon;
    currentPolygon.undo();

    if (currentPolygon.length() === 0) {
      redoStack.push(currentPolygon);
    } else {
      undoStack.push(currentPolygon);
    }

    redraw();
  };

  const redo = () => {
    if (innerRedo()) {
      return;
    }

    const currentRedoPolygon = redoStack.pop() as Polygon;

    if (currentRedoPolygon) {
      currentRedoPolygon.redo();
      undoStack.push(currentRedoPolygon);
    }

    redraw();
  };

  const innerRedo = () => {
    const currentPolygon = undoStack.pop() as Polygon;
    let returnValue = false;

    if (currentPolygon) {
      if (currentPolygon.redoStackLength() > 0) {
        currentPolygon.redo();
        returnValue = true;
      }
      undoStack.push(currentPolygon);
    }

    redraw();
    return returnValue;
  };

  return [leftClick, doubleClick, undo, redo] as ((...args: any[]) => void)[];
};
