import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";
import { PolygonDrawingProgram } from "./PolygonDrawingProgram.js";

export const InputHandlerService = (
  canvas: HTMLCanvasElement,
  drawingProgram: PolygonDrawingProgram,
) => {
  let singleClickTimeout: number | null = null;

  const setupEventListeners = () => {
    canvas.addEventListener("click", (event: MouseEvent) =>
      handleLeftClick(event),
    );

    canvas.addEventListener("dblclick", (event: MouseEvent) =>
      handleDoubleClick(event),
    );

    const undoButton = document.getElementById("undo");
    undoButton?.addEventListener("click", () => drawingProgram.undo());

    const redoButton = document.getElementById("redo");
    redoButton?.addEventListener("click", () => drawingProgram.redo());
  };

  const getMousePosition = (event: MouseEvent): Point => {
    const rect = canvas.getBoundingClientRect();
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  };

  const handleLeftClick = (event: MouseEvent) => {
    if (singleClickTimeout !== null) {
      clearTimeout(singleClickTimeout);
    }

    singleClickTimeout = window.setTimeout(() => {
      const point = getMousePosition(event);

      drawingProgram.leftClick(point);

      singleClickTimeout = null;
    }, 300);
  };

  const handleDoubleClick = (event: MouseEvent) => {
    if (singleClickTimeout !== null) {
      clearTimeout(singleClickTimeout);
      singleClickTimeout = null;
    }

    drawingProgram.doubleClick();
  };

  setupEventListeners();
};
