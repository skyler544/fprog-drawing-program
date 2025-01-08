import { Point } from "../entities/Point.js";
import { Polygon, IPolygon } from "../entities/Polygon.js";

export const PolygonDrawingProgram = (
  drawingService: (polygons: IPolygon[]) => void,
) => {
  const undoStack: IPolygon[] = [];
  const redoStack: IPolygon[] = [];

  const redraw = () => {
    drawingService(undoStack);
  };

  const leftClick = (point: Point) => {
    const currentPolygon = undoStack.pop() ?? Polygon();
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
    undoStack.push(Polygon());
    return;
  };

  const undo = () => {
    if (undoStack.length === 0) {
      return;
    }

    const currentPolygon = undoStack.pop() as IPolygon;
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

    const currentRedoPolygon = redoStack.pop() as IPolygon;

    if (currentRedoPolygon) {
      currentRedoPolygon.redo();
      undoStack.push(currentRedoPolygon);
    }

    redraw();
  };

  const innerRedo = () => {
    const currentPolygon = undoStack.pop() as IPolygon;
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
