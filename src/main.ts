import { DrawingProgram } from "./drawing.js";
import { InputHandler } from "./input-handler.js";

window.onload = () => {
  const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const drawingProgram = new DrawingProgram(ctx);
  new InputHandler(canvas, drawingProgram);
};
