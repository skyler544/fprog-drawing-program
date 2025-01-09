import { PolygonDrawingProgram } from "../services/PolygonDrawingProgram";
import { Polygon, IPolygon } from "../entities/Polygon";
import { Point } from "../entities/Point";

describe("PolygonDrawingProgram", () => {
  let mockDrawingService: jest.Mock;
  let program: ReturnType<typeof PolygonDrawingProgram>;

  beforeEach(() => {
    mockDrawingService = jest.fn();
    program = PolygonDrawingProgram(mockDrawingService);
  });

  it("should call the drawing service on redraw", () => {
    program.leftClick({ x: 10, y: 20 });
    expect(mockDrawingService).toHaveBeenCalled();
  });

  it("should add a point to the current polygon on leftClick", () => {
    program.leftClick({ x: 10, y: 20 });
    program.leftClick({ x: 30, y: 40 });

    const polygons = mockDrawingService.mock.calls[0][0];
    expect(polygons.length).toBe(1);
    expect(polygons[0].getPoints()).toEqual([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
  });

  it("should start a new polygon on doubleClick", () => {
    program.leftClick({ x: 10, y: 20 });
    program.doubleClick();
    program.leftClick({ x: 30, y: 40 });

    const polygons = mockDrawingService.mock.calls[1][0];
    expect(polygons.length).toBe(2);
    expect(polygons[0].getPoints()).toEqual([{ x: 10, y: 20 }]);
    expect(polygons[1].getPoints()).toEqual([{ x: 30, y: 40 }]);
  });

  it("should undo the last point in the current polygon", () => {
    program.leftClick({ x: 10, y: 20 });
    program.leftClick({ x: 30, y: 40 });
    program.undo();

    const polygons = mockDrawingService.mock.calls[1][0];
    expect(polygons.length).toBe(1);
    expect(polygons[0].getPoints()).toEqual([{ x: 10, y: 20 }]);
  });

  it("should redo a point in the current polygon", () => {
    program.leftClick({ x: 10, y: 20 });
    program.leftClick({ x: 30, y: 40 });
    program.undo();
    program.redo();

    const polygons = mockDrawingService.mock.calls[2][0];
    expect(polygons.length).toBe(1);
    expect(polygons[0].getPoints()).toEqual([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
  });

  // it("should redo an empty polygon after undoing it", () => {
  // program.doubleClick();
  // program.undo();
  // program.redo();

  // const polygons = mockDrawingService.mock.calls[2][0];
  // expect(polygons.length).toBe(1);
  // expect(polygons[0].getPoints()).toEqual([]);
  // });

  it("should not redo if there is nothing in the redo stack", () => {
    program.redo();
    expect(mockDrawingService).toHaveBeenCalledTimes(0); // No redraw occurs
  });

  it("should handle multiple undo/redo operations correctly", () => {
    program.leftClick({ x: 10, y: 20 });
    program.leftClick({ x: 30, y: 40 });
    program.doubleClick();
    program.leftClick({ x: 50, y: 60 });

    program.undo();
    program.undo();

    let polygons = mockDrawingService.mock.calls[2][0];
    expect(polygons.length).toBe(1);
    expect(polygons[0].getPoints()).toEqual([{ x: 10, y: 20 }]);

    program.redo(); // Redo polygon
    program.redo(); // Redo point (50, 60)

    polygons = mockDrawingService.mock.calls[4][0];
    expect(polygons.length).toBe(2);
    expect(polygons[1].getPoints()).toEqual([{ x: 50, y: 60 }]);
  });

  it("should clear the redo stack after a new point is added", () => {
    program.leftClick({ x: 10, y: 20 });
    program.undo();
    program.leftClick({ x: 30, y: 40 });

    expect(mockDrawingService).toHaveBeenCalledTimes(3);
    const polygons = mockDrawingService.mock.calls[2][0];
    expect(polygons.length).toBe(1);
    expect(polygons[0].getPoints()).toEqual([{ x: 30, y: 40 }]);
  });
});
