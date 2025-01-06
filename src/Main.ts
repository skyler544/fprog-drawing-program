import { DotDrawingProgram } from "./core/services/DotDrawingProgram.js";
import { PolygonDrawingProgram } from "./core/services/PolygonDrawingProgram.js";
import { InputHandler } from "./ui/InputHandler.js";

export class Main {
  constructor() {
    this.init();
  }

  private init() {
    const canvas = document.getElementById(
      "drawingCanvas",
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    // const drawingProgram = new DotDrawingProgram(ctx);
    const drawingProgram = new PolygonDrawingProgram(ctx);
    new InputHandler(canvas, drawingProgram);
  }
}

window.onload = () => {
  new Main();
};
