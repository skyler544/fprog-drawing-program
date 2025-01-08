import { Polygon } from "../entities/Polygon";

export class DrawingService {
  private ctx: CanvasRenderingContext2D;
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  draw(polygons: Polygon[]) {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    polygons.forEach((polygon) => {
      if (polygon) {
        this.drawPolygon(polygon);
      }
    });
  }

  private drawPolygon(polygon: Polygon) {
    if (polygon.length() < 2) {
      return;
    }

    this.ctx.beginPath();
    this.ctx.moveTo(polygon.getPoints()[0].x, polygon.getPoints()[0].y);

    for (let i = 1; i < polygon.getPoints().length; i++) {
      const point = polygon.getPoints()[i];
      this.ctx.lineTo(point.x, point.y);
    }

    this.ctx.strokeStyle = "black";
    this.ctx.stroke();
  }
}
