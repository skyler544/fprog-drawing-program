import { Point } from "./point";

export interface IDrawingProgram {
  leftClick(point: Point): void;
  doubleClick(point: Point): void;
  undo(): void;
  redo(): void;
}
