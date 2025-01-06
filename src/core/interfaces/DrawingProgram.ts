import { Point } from "../entities/Point.js";

export interface IDrawingProgram {
  leftClick(point: Point): void;
  doubleClick(): void;
  undo(): void;
  redo(): void;
}
