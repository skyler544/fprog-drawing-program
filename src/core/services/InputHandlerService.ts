import { Point } from "../entities/Point.js";
import { IDrawingProgram } from "../interfaces/DrawingProgram.js";

export class InputHandlerService {
  private canvas: HTMLCanvasElement;
  private drawingProgram: IDrawingProgram;
  private singleClickTimeout: number | null = null;

  constructor(canvas: HTMLCanvasElement, drawingProgram: IDrawingProgram) {
    this.canvas = canvas;
    this.drawingProgram = drawingProgram;
    this.setupEventListeners();
  }

  setupEventListeners() {
    this.canvas.addEventListener("click", (event: MouseEvent) =>
      this.handleLeftClick(event),
    );

    this.canvas.addEventListener("dblclick", (event: MouseEvent) =>
      this.handleDoubleClick(event),
    );

    const undoButton = document.getElementById("undo");
    undoButton?.addEventListener("click", () => this.drawingProgram.undo());

    const redoButton = document.getElementById("redo");
    redoButton?.addEventListener("click", () => this.drawingProgram.redo());
  }

  getMousePosition(event: MouseEvent): Point {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  }

  handleLeftClick(event: MouseEvent) {
    if (this.singleClickTimeout !== null) {
      clearTimeout(this.singleClickTimeout);
    }

    this.singleClickTimeout = window.setTimeout(() => {
      const point = this.getMousePosition(event);

      console.log("Left click:");
      console.log(point);

      this.drawingProgram.leftClick(point);

      this.singleClickTimeout = null;
    }, 300);
  }

  handleDoubleClick(event: MouseEvent) {
    if (this.singleClickTimeout !== null) {
      clearTimeout(this.singleClickTimeout);
      this.singleClickTimeout = null;
    }

    console.log("Double click:");

    this.drawingProgram.doubleClick();
  }
}
