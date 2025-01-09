import { Polygon } from "../entities/Polygon";
import { Point } from "../entities/Point";

describe("Polygon", () => {
  let polygon: ReturnType<typeof Polygon>;

  beforeEach(() => {
    polygon = Polygon();
  });

  it("should start with an empty list of points", () => {
    expect(polygon.getPoints()).toEqual([]);
    expect(polygon.length()).toBe(0);
  });

  it("should add points to the polygon", () => {
    const point1: Point = { x: 10, y: 20 };
    const point2: Point = { x: 30, y: 40 };

    polygon.addPoint(point1);
    polygon.addPoint(point2);

    expect(polygon.getPoints()).toEqual([point1, point2]);
    expect(polygon.length()).toBe(2);
  });

  it("should clear the redo stack after adding a point", () => {
    const point1: Point = { x: 10, y: 20 };
    const point2: Point = { x: 30, y: 40 };

    polygon.addPoint(point1);
    polygon.undo();
    expect(polygon.redoStackLength()).toBe(1);

    polygon.addPoint(point2);
    expect(polygon.redoStackLength()).toBe(0);
  });

  it("should undo the last point added", () => {
    const point1: Point = { x: 10, y: 20 };
    const point2: Point = { x: 30, y: 40 };

    polygon.addPoint(point1);
    polygon.addPoint(point2);
    polygon.undo();

    expect(polygon.getPoints()).toEqual([point1]);
    expect(polygon.length()).toBe(1);
    expect(polygon.redoStackLength()).toBe(1);
  });

  it("should not undo if there are no points", () => {
    polygon.undo();
    expect(polygon.getPoints()).toEqual([]);
    expect(polygon.redoStackLength()).toBe(0);
  });

  it("should redo the last undone point", () => {
    const point1: Point = { x: 10, y: 20 };
    const point2: Point = { x: 30, y: 40 };

    polygon.addPoint(point1);
    polygon.addPoint(point2);
    polygon.undo();
    polygon.redo();

    expect(polygon.getPoints()).toEqual([point1, point2]);
    expect(polygon.length()).toBe(2);
    expect(polygon.redoStackLength()).toBe(0);
  });

  it("should not redo if there are no points in the redo stack", () => {
    polygon.redo();
    expect(polygon.getPoints()).toEqual([]);
    expect(polygon.redoStackLength()).toBe(0);
  });

  it("should handle consecutive undo and redo operations correctly", () => {
    const point1: Point = { x: 10, y: 20 };
    const point2: Point = { x: 30, y: 40 };
    const point3: Point = { x: 50, y: 60 };

    polygon.addPoint(point1);
    polygon.addPoint(point2);
    polygon.addPoint(point3);

    polygon.undo();
    polygon.undo();
    polygon.redo();

    expect(polygon.getPoints()).toEqual([point1, point2]);
    expect(polygon.redoStackLength()).toBe(1);
  });

  it("should maintain correct state after multiple undos and adding a new point", () => {
    const point1: Point = { x: 10, y: 20 };
    const point2: Point = { x: 30, y: 40 };
    const point3: Point = { x: 50, y: 60 };

    polygon.addPoint(point1);
    polygon.addPoint(point2);

    polygon.undo();
    polygon.undo();
    polygon.addPoint(point3);

    expect(polygon.getPoints()).toEqual([point3]);
    expect(polygon.redoStackLength()).toBe(0);
    expect(polygon.length()).toBe(1);
  });
});
