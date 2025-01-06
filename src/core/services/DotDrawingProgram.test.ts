import { Point } from "../entities/Point";
import { DotDrawingProgram } from "./DotDrawingProgram";

describe("DotDrawingProgram", () => {
  let mockCtx: CanvasRenderingContext2D;
  let drawingProgram: DotDrawingProgram;

  beforeEach(() => {
    // Mock the CanvasRenderingContext2D methods
    mockCtx = {
      beginPath: jest.fn(),
      arc: jest.fn(),
      fill: jest.fn(),
      closePath: jest.fn(),
      clearRect: jest.fn(),
      fillStyle: "",
    } as unknown as CanvasRenderingContext2D;

    drawingProgram = new DotDrawingProgram(mockCtx);
  });

  it("should draw a dot at the correct position on leftClick", () => {
    const point = new Point(100, 150);

    drawingProgram.leftClick(point);

    // Verify that beginPath was called
    expect(mockCtx.beginPath).toHaveBeenCalled();

    // Verify that arc was called with the correct parameters
    expect(mockCtx.arc).toHaveBeenCalledWith(
      point.x,
      point.y,
      4,
      0,
      Math.PI * 2,
    );

    // Verify that fillStyle was set to black
    expect(mockCtx.fillStyle).toBe("black");

    // Verify that fill was called
    expect(mockCtx.fill).toHaveBeenCalled();

    // Verify that closePath was called
    expect(mockCtx.closePath).toHaveBeenCalled();
  });
});
