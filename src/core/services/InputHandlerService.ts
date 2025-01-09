import { Point } from "../entities/Point.js";
import { IPolygonDrawingProgram } from "./PolygonDrawingProgram.js";

export const InputHandlerService = (
  canvas: HTMLCanvasElement,
  drawingProgram: IPolygonDrawingProgram,
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
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    } as Point;
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
