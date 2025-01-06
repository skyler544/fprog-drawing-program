import { DotDrawingProgram } from "./core/services/DotDrawingProgram.js";
import { InputHandler } from "./ui/InputHandler.js";

export class Main {
  constructor() {
    const canvas = document.getElementById(
      "drawingCanvas",
    ) as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const drawingProgram = new DotDrawingProgram(ctx);
    new InputHandler(canvas, drawingProgram);
  }
}

window.onload = () => {
  new Main();
};
