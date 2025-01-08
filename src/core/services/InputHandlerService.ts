import { Point } from "../entities/Point.js";
import { PolygonDrawingProgram } from "./PolygonDrawingProgram.js";

export const InputHandlerService = (
  canvas: HTMLCanvasElement,
  drawingProgram: ((...args: any[]) => void)[],
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
    undoButton?.addEventListener("click", () => drawingProgram[2]());

    const redoButton = document.getElementById("redo");
    redoButton?.addEventListener("click", () => drawingProgram[3]());
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

      drawingProgram[0](point);

      singleClickTimeout = null;
    }, 300);
  };

  const handleDoubleClick = (event: MouseEvent) => {
    if (singleClickTimeout !== null) {
      clearTimeout(singleClickTimeout);
      singleClickTimeout = null;
    }

    drawingProgram[1]();
  };

  setupEventListeners();
};
