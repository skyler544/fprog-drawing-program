import { Point } from "../entities/Point.js";

export interface IDrawingProgram {
  leftClick(point: Point): void;
  doubleClick(point: Point): void;
  undo(): void;
  redo(): void;
}
