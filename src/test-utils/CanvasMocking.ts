export function createMockCanvasContext(): CanvasRenderingContext2D {
  return {
    canvas: {
      width: 600,
      height: 600,
    } as HTMLCanvasElement,
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
    closePath: jest.fn(),
    clearRect: jest.fn(),
    fillStyle: "",
  } as unknown as CanvasRenderingContext2D;
}
