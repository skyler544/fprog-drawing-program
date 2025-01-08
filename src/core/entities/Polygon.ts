import { Point } from "./Point.js";

export interface IPolygon {
  getPoints: () => Point[];
  addPoint: (point: Point) => void;
  length: () => number;
  redoStackLength: () => number;
  undo: () => void;
  redo: () => void;
}

export const Polygon = (): IPolygon => {
  const points: Point[] = [];
  const redoStack: Point[] = [];

  const getPoints = (): Point[] => {
    return points;
  };

  const addPoint = (point: Point) => {
    points.push(point);
    emptyRedoStack();
  };

  const emptyRedoStack = () => {
    while (redoStack.length > 0) {
      redoStack.pop();
    }
  };

  const length = () => {
    return points.length;
  };

  const redoStackLength = () => {
    return redoStack.length;
  };

  const undo = () => {
    if (points.length === 0) {
      return;
    }

    redoStack.push(points.pop() as Point);
  };

  const redo = () => {
    if (redoStack.length === 0) {
      return;
    }

    points.push(redoStack.pop() as Point);
  };

  return {
    getPoints,
    addPoint,
    length,
    redoStackLength,
    undo,
    redo,
  };
};
