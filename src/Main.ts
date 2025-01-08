import { DrawingService } from "./core/services/DrawingService.js";
import { PolygonDrawingProgram } from "./core/services/PolygonDrawingProgram.js";
import { InputHandlerService } from "./core/services/InputHandlerService.js";

export class Main {
  constructor() {
    this.init();
  }

  private init() {
    const canvas = document.getElementById(
      "drawingCanvas",
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const drawingProgram = PolygonDrawingProgram(DrawingService(ctx));
    InputHandlerService(canvas, drawingProgram);
  }
}

window.onload = () => {
  new Main();
};
