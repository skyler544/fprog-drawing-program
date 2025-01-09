import { DrawingService } from "../services/DrawingService";
import { IPolygon } from "../entities/Polygon";
import { Point } from "../entities/Point";

describe("DrawingService", () => {
  let ctx: CanvasRenderingContext2D;
  let draw: (polygons: IPolygon[]) => void;

  beforeEach(() => {
    ctx = {
      beginPath: jest.fn(),
      moveTo: jest.fn(),
      lineTo: jest.fn(),
      stroke: jest.fn(),
      clearRect: jest.fn(),
      canvas: { width: 500, height: 500 },
      strokeStyle: "",
    } as unknown as CanvasRenderingContext2D;

    draw = DrawingService(ctx);
  });

  const setupMockPolygon = (points: Point[]) => {
    return {
      length: () => points.length,
      getPoints: () => points,
      addPoint: jest.fn(),
      redoStackLength: jest.fn(),
      undo: jest.fn(),
      redo: jest.fn(),
    };
  };

  it("clears the canvas before drawing", () => {
    const mockPolygon = setupMockPolygon([
      { x: 10, y: 10 },
      { x: 20, y: 20 },
    ]);
    draw([mockPolygon]);

    expect(ctx.clearRect).toHaveBeenCalledWith(0, 0, 500, 500);
  });

  it("does not draw a polygon with less than 2 points", () => {
    const mockPolygon = setupMockPolygon([{ x: 10, y: 10 }]);

    draw([mockPolygon]);

    expect(ctx.beginPath).not.toHaveBeenCalled();
    expect(ctx.moveTo).not.toHaveBeenCalled();
    expect(ctx.lineTo).not.toHaveBeenCalled();
    expect(ctx.stroke).not.toHaveBeenCalled();
  });

  it("draws a polygon with at least 2 points", () => {
    const mockPolygon = setupMockPolygon([
      { x: 10, y: 10 },
      { x: 20, y: 20 },
    ]);

    draw([mockPolygon]);

    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 10);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 20);
    expect(ctx.stroke).toHaveBeenCalled();
  });

  it("handles multiple polygons", () => {
    const mockPolygon1 = setupMockPolygon([
      { x: 10, y: 10 },
      { x: 20, y: 20 },
    ]);
    const mockPolygon2 = setupMockPolygon([
      { x: 30, y: 30 },
      { x: 40, y: 40 },
      { x: 50, y: 50 },
    ]);

    draw([mockPolygon1, mockPolygon2]);

    // First polygon
    expect(ctx.beginPath).toHaveBeenCalled();
    expect(ctx.moveTo).toHaveBeenCalledWith(10, 10);
    expect(ctx.lineTo).toHaveBeenCalledWith(20, 20);

    // Second polygon
    expect(ctx.moveTo).toHaveBeenCalledWith(30, 30);
    expect(ctx.lineTo).toHaveBeenCalledWith(40, 40);
    expect(ctx.lineTo).toHaveBeenCalledWith(50, 50);

    expect(ctx.stroke).toHaveBeenCalledTimes(2);
  });

  it("does nothing when given an empty polygon list", () => {
    draw([]);

    expect(ctx.clearRect).toHaveBeenCalled();
    expect(ctx.beginPath).not.toHaveBeenCalled();
    expect(ctx.stroke).not.toHaveBeenCalled();
  });
});
