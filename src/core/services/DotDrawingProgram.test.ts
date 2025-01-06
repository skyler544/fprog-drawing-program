import { Point } from "../entities/Point";
import { DotDrawingProgram } from "./DotDrawingProgram";
import { createMockCanvasContext } from "../../test-utils/CanvasMocking";

describe("DotDrawingProgram", () => {
  let mockCtx: CanvasRenderingContext2D;
  let drawingProgram: DotDrawingProgram;

  beforeEach(() => {
    mockCtx = createMockCanvasContext();
    drawingProgram = new DotDrawingProgram(mockCtx);
  });

  it("should draw a dot at the correct position on leftClick", () => {
    drawingProgram.leftClick(new Point(100, 150));

    expect(mockCtx.beginPath).toHaveBeenCalled();
    expect(mockCtx.arc).toHaveBeenCalled();

    expect(mockCtx.fillStyle).toBe("black");
    expect(mockCtx.fill).toHaveBeenCalled();

    expect(mockCtx.closePath).toHaveBeenCalled();
  });

  it("should add a point to the undo stack on leftClick", () => {
    drawingProgram.leftClick(new Point(100, 150));

    expect(drawingProgram["undoStack"]).toEqual([new Point(100, 150)]);
  });

  it("should move the last point to the redo stack on undo", () => {
    drawingProgram.leftClick(new Point(100, 150));
    drawingProgram.undo();

    expect(drawingProgram["undoStack"]).toEqual([]);
    expect(drawingProgram["redoStack"]).toEqual([new Point(100, 150)]);
  });
});
