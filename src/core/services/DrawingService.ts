import { IPolygon } from "../entities/Polygon.js";

export const DrawingService = (ctx: CanvasRenderingContext2D) => {
  const draw = (polygons: IPolygon[]) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    polygons.forEach((polygon) => {
      if (polygon) {
        drawPolygon(polygon);
      }
    });
  };

  const drawPolygon = (polygon: IPolygon) => {
    if (polygon.length() < 2) {
      return;
    }

    ctx.beginPath();
    ctx.moveTo(polygon.getPoints()[0].x, polygon.getPoints()[0].y);

    for (let i = 1; i < polygon.getPoints().length; i++) {
      const point = polygon.getPoints()[i];
      ctx.lineTo(point.x, point.y);
    }

    ctx.strokeStyle = "black";
    ctx.stroke();
  };

  return draw;
};
