import { Point } from "./point.js";
import { DrawingProgram } from "./drawing.js";

export class InputHandler {
  private canvas: HTMLCanvasElement;
  private drawingProgram: DrawingProgram;

  constructor(canvas: HTMLCanvasElement, drawingProgram: DrawingProgram) {
    this.canvas = canvas;
    this.drawingProgram = drawingProgram;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.canvas.addEventListener("click", (event: MouseEvent) =>
      this.handleLeftClick(event),
    );
  }

  getMousePosition(event: MouseEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  }

  handleLeftClick(event: MouseEvent) {
    const point = this.getMousePosition(event);

    console.log("Left click:");
    console.log(point);

    this.drawingProgram.leftClick(point);
  }
}
