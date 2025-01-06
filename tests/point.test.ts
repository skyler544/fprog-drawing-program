import { Point } from "../src/point";

describe("Point", () => {
  // Proof of concept, "point"less unit test ...
  test("should create a point with correct x and y values", () => {
    const point = new Point(10, 20);
    expect(point.x).toBe(10);
    expect(point.y).toBe(20);
  });
});
