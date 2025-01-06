import { DrawingProgram } from "./drawing.js";

window.onload = () => {
  const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
  new DrawingProgram(canvas);
};
