import { PolygonDrawingProgram } from "./PolygonDrawingProgram";
import { DrawingService } from "../services/DrawingService";
import { Point } from "../entities/Point";
import { Polygon } from "../entities/Polygon";

jest.mock("../services/DrawingService");

describe("PolygonDrawingProgram", () => {
  let drawingService: jest.Mocked<DrawingService>;
  let program: PolygonDrawingProgram;

  beforeEach(() => {
    drawingService = new DrawingService(
      {} as CanvasRenderingContext2D,
    ) as jest.Mocked<DrawingService>;
    drawingService.draw = jest.fn();
    program = new PolygonDrawingProgram(drawingService);
  });

  it("should add a point to a new polygon on left click", () => {
    const point = new Point(10, 20);

    program.leftClick(point);

    expect(drawingService.draw).toHaveBeenCalledTimes(1);
    const polygons = (drawingService.draw as jest.Mock).mock
      .calls[0][0] as Polygon[];
    expect(polygons[0].getPoints()).toEqual([point]);
  });

  it("should undo the last point of the current polygon", () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);

    program.leftClick(point1);
    program.leftClick(point2);

    program.undo();

    const polygons = (drawingService.draw as jest.Mock).mock.calls[
      drawingService.draw.mock.calls.length - 1
    ][0] as Polygon[];
    expect(polygons[0].getPoints()).toEqual([point1]);
  });

  it("should remove a polygon when undoing its last point", () => {
    const point = new Point(10, 20);

    program.leftClick(point);
    program.undo();

    const polygons = (drawingService.draw as jest.Mock).mock.calls[
      drawingService.draw.mock.calls.length - 1
    ][0] as Polygon[];
    expect(polygons).toEqual([]); // The polygon with no points is removed.
  });

  it("should redo the last undone point in the current polygon", () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);

    program.leftClick(point1);
    program.leftClick(point2);

    program.undo(); // Undo removes point2.
    program.redo(); // Redo restores point2.

    const polygons = (drawingService.draw as jest.Mock).mock.calls[
      drawingService.draw.mock.calls.length - 1
    ][0] as Polygon[];
    expect(polygons[0].getPoints()).toEqual([point1, point2]); // Point2 is restored.
  });

  it("should redo an undone polygon", () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);

    program.leftClick(point1);
    program.leftClick(point2);

    program.undo(); // Removes point2.
    program.undo(); // Removes point1 (polygon now empty).
    program.redo(); // Restores polygon with point1.

    const polygons = (drawingService.draw as jest.Mock).mock.calls[
      drawingService.draw.mock.calls.length - 1
    ][0] as Polygon[];
    expect(polygons[0].getPoints()).toEqual([point1]);
  });

  it("should not redo if there is nothing to redo", () => {
    program.redo();
    expect(drawingService.draw).toHaveBeenCalledTimes(0);
  });

  it("should handle multiple undo and redo actions", () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);
    const point3 = new Point(50, 60);

    program.leftClick(point1);
    program.leftClick(point2);
    program.leftClick(point3);

    program.undo();
    program.undo();
    program.redo();
    program.redo();

    const polygons = (drawingService.draw as jest.Mock).mock.calls[
      drawingService.draw.mock.calls.length - 1
    ][0] as Polygon[];
    expect(polygons[0].getPoints()).toEqual([point1, point2, point3]);
  });

  it("should clear the redo stack on left click", () => {
    const point1 = new Point(10, 20);
    const point2 = new Point(30, 40);

    program.leftClick(point1);
    program.undo();
    program.leftClick(point2);

    program.redo();

    const polygons = (drawingService.draw as jest.Mock).mock.calls[
      drawingService.draw.mock.calls.length - 1
    ][0] as Polygon[];
    expect(polygons[0].getPoints()).toEqual([point2]);
  });
});
