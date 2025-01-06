import { DrawingProgram } from "../src/drawing";
import { Point } from "../src/point";

class MockCanvasElement extends HTMLCanvasElement {
  getBoundingClientRect(): DOMRect {
    return {
      x: 0,
      y: 0,
      width: 600,
      height: 600,
      top: 0,
      left: 0,
      bottom: 600,
      right: 600,
      toJSON: () => "",
    };
  }
}

describe("DrawingProgram", () => {
  let canvas: HTMLCanvasElement;
  let drawingProgram: DrawingProgram;

  beforeEach(() => {
    canvas = new MockCanvasElement();
    drawingProgram = new DrawingProgram(canvas);
  });

  test("getMousePosition should return correct point", () => {
    const event = {
      clientX: 100,
      clientY: 200,
    } as MouseEvent;

    const position = drawingProgram.getMousePosition(event);
    expect(position).toEqual(new Point(100, 200));
  });
});
