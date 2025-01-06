import { DotDrawingProgram } from "./dot-drawing.js";
import { InputHandler } from "./input-handler.js";

window.onload = () => {
  const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const drawingProgram = new DotDrawingProgram(ctx);
  new InputHandler(canvas, drawingProgram);
};
