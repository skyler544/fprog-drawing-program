type Point = Readonly<{
  x: number;
  y: number;
}>;

type DrawingState = Readonly<{
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  radius: number;
}>;

const createPoint = (x: number, y: number): Point => ({ x, y });

const getMousePosition = (
  canvas: HTMLCanvasElement,
  event: MouseEvent,
): Point => {
  const rect = canvas.getBoundingClientRect();
  return createPoint(event.clientX - rect.left, event.clientY - rect.top);
};

const drawDot = (
  ctx: CanvasRenderingContext2D,
  point: Point,
  radius: number,
): void => {
  ctx.beginPath();
  ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
  ctx.fillStyle = "black";
  ctx.fill();
  ctx.closePath();
};

const handleLeftClick =
  (state: DrawingState) =>
  (event: MouseEvent): void => {
    const point = getMousePosition(state.canvas, event);

    console.log("Left click:");
    console.log(point);

    drawDot(state.ctx, point, state.radius);
  };

const initializeDrawingProgram = (canvas: HTMLCanvasElement): void => {
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  const state: DrawingState = {
    canvas,
    ctx,
    radius: 4,
  };

  canvas.addEventListener("click", handleLeftClick(state));
};

window.onload = () => {
  const canvas = document.getElementById("drawingCanvas") as HTMLCanvasElement;
  initializeDrawingProgram(canvas);
};
