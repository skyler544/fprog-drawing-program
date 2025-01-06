import { initializeDrawingProgram } from "./drawing.js";

window.onload = () => {
  const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
  initializeDrawingProgram(canvas);
};
