import { createMockCanvasContext } from "../../test-utils/CanvasMocking";
import { Polygon } from "../entities/Polygon";
import { DrawingService } from "./DrawingService";

describe("DrawingService", () => {
  let mockCtx: CanvasRenderingContext2D;
  let drawingService: DrawingService;

  beforeEach(() => {
    mockCtx = createMockCanvasContext();
    drawingService = new DrawingService(mockCtx);
  });

  function createMockPolygon(points: { x: number; y: number }[]): Polygon {
    return {
      getPoints: jest.fn(() => points),
      length: jest.fn(() => points.length),
    } as unknown as Polygon;
  }

  it("should clear the canvas before drawing", () => {
    const polygon = createMockPolygon([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
    drawingService.draw([polygon]);

    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 600, 600);
  });

  it("should draw a polygon with multiple points", () => {
    const points = [
      { x: 10, y: 20 },
      { x: 30, y: 40 },
      { x: 50, y: 60 },
    ];
    const polygon = createMockPolygon(points);

    drawingService.draw([polygon]);

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.moveTo).toHaveBeenCalledWith(10, 20);

    points.slice(1).forEach((point) => {
      expect(mockCtx.lineTo).toHaveBeenCalledWith(point.x, point.y);
    });

    expect(mockCtx.strokeStyle).toBe("black");
    expect(mockCtx.stroke).toHaveBeenCalled();
  });

  it("should not draw polygons with fewer than 2 points", () => {
    const polygon = createMockPolygon([{ x: 10, y: 20 }]);
    drawingService.draw([polygon]);

    expect(mockCtx.beginPath).not.toHaveBeenCalled();
    expect(mockCtx.moveTo).not.toHaveBeenCalled();
    expect(mockCtx.lineTo).not.toHaveBeenCalled();
    expect(mockCtx.stroke).not.toHaveBeenCalled();
  });

  it("should handle an empty list of polygons", () => {
    drawingService.draw([]);

    expect(mockCtx.clearRect).toHaveBeenCalledWith(0, 0, 600, 600);
    expect(mockCtx.beginPath).not.toHaveBeenCalled();
  });

  it("should skip null or undefined polygons", () => {
    const polygon = createMockPolygon([
      { x: 10, y: 20 },
      { x: 30, y: 40 },
    ]);
    drawingService.draw([
      polygon,
      null as unknown as Polygon,
      undefined as unknown as Polygon,
    ]);

    expect(mockCtx.beginPath).toHaveBeenCalledTimes(1);
    expect(mockCtx.moveTo).toHaveBeenCalledWith(10, 20);
  });
});
