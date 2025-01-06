import { Point } from "./point.js";

export class DrawingProgram {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private radius = 4;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
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

    this.drawDot(point);
  }

  drawDot(point: Point) {
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, this.radius, 0, Math.PI * 2);

    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();
  }
}
