import { Polygon } from "./Polygon";
import { Point } from "./Point";

describe("Polygon", () => {
  let polygon: Polygon;

  beforeEach(() => {
    polygon = new Polygon();
  });

  it("should add a point to the polygon", () => {
    const point = new Point(1, 2);
    polygon.addPoint(point);

    expect(polygon.getPoints()).toEqual([point]);
    expect(polygon.length()).toBe(1);
    expect(polygon.redoStackLength()).toBe(0);
  });

  it("should undo the last added point", () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(3, 4);

    polygon.addPoint(point1);
    polygon.addPoint(point2);
    polygon.undo();

    expect(polygon.getPoints()).toEqual([point1]);
    expect(polygon.redoStackLength()).toBe(1);
    expect(polygon.length()).toBe(1);
  });

  it("should clear the redo stack when adding a point", () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(3, 4);

    polygon.addPoint(point1);
    polygon.undo();
    expect(polygon.redoStackLength()).toBe(1);

    polygon.addPoint(point2);
    expect(polygon.getPoints()).toEqual([point2]);
    expect(polygon.redoStackLength()).toBe(0);
  });

  it("should redo the last undone point", () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(3, 4);

    polygon.addPoint(point1);
    polygon.addPoint(point2);
    polygon.undo();
    polygon.redo();

    expect(polygon.getPoints()).toEqual([point1, point2]);
    expect(polygon.redoStackLength()).toBe(0);
    expect(polygon.length()).toBe(2);
  });

  it("should not undo if there are no points", () => {
    polygon.undo();

    expect(polygon.getPoints()).toEqual([]);
    expect(polygon.redoStackLength()).toBe(0);
    expect(polygon.length()).toBe(0);
  });

  it("should not redo if the redo stack is empty", () => {
    const point = new Point(1, 2);
    polygon.addPoint(point);
    polygon.redo();

    expect(polygon.getPoints()).toEqual([point]);
    expect(polygon.redoStackLength()).toBe(0);
    expect(polygon.length()).toBe(1);
  });

  it("should correctly handle multiple undo and redo operations", () => {
    const point1 = new Point(1, 2);
    const point2 = new Point(3, 4);
    const point3 = new Point(5, 6);

    polygon.addPoint(point1);
    polygon.addPoint(point2);
    polygon.addPoint(point3);

    polygon.undo();
    polygon.undo();
    polygon.redo();
    polygon.undo();

    expect(polygon.getPoints()).toEqual([point1]);
    expect(polygon.redoStackLength()).toBe(2);
    expect(polygon.length()).toBe(1);
  });
});
