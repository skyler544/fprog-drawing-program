import { IDrawingProgram } from "./drawing-interface.js";
import { Point } from "./point.js";

export class InputHandler {
  private canvas: HTMLCanvasElement;
  private drawingProgram: IDrawingProgram;

  constructor(canvas: HTMLCanvasElement, drawingProgram: IDrawingProgram) {
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
