class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Line {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.moveTo(this.start.x, this.start.y);
    ctx.lineTo(this.end.x, this.end.y);
    ctx.stroke();
  }
}

class Shape {
  constructor() {
    this.lines = [];
  }

  addLine(line) {
    this.lines.push(line);
  }

  draw(ctx) {
    this.lines.forEach((line) => line.draw(ctx));
  }
}

class Command {
  execute() {}
  undo() {}
}

class AddLineCommand extends Command {
  constructor(shape, line) {
    super();
    this.shape = shape;
    this.line = line;
  }

  execute() {
    this.shape.addLine(this.line);
  }

  undo() {
    this.shape.lines.pop();
  }
}

class AddShapeCommand extends Command {
  constructor(shapes, shape) {
    super();
    this.shapes = shapes;
    this.shape = shape;
  }

  execute() {
    this.shapes.push(this.shape);
  }

  undo() {
    this.shapes.pop();
  }
}

class DrawingProgram {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.shapes = [];
    this.activeShape = new Shape();
    this.tempLineStart = null;
    this.undoStack = [];
    this.redoStack = [];

    this.setupEventListeners();
  }

  setupEventListeners() {
    this.canvas.addEventListener("click", (event) =>
      this.handleMouseClick(event),
    );
    this.canvas.addEventListener("contextmenu", (event) => {
      event.preventDefault();
      this.finishShape();
    });

    document
      .getElementById("undo")
      .addEventListener("click", () => this.undo());
    document
      .getElementById("redo")
      .addEventListener("click", () => this.redo());
  }

  getMousePosition(event) {
    const rect = this.canvas.getBoundingClientRect();
    return new Point(event.clientX - rect.left, event.clientY - rect.top);
  }

  handleMouseClick(event) {
    const point = this.getMousePosition(event);

    if (this.tempLineStart === null) {
      this.tempLineStart = point;
    } else {
      const line = new Line(this.tempLineStart, point);
      const command = new AddLineCommand(this.activeShape, line);
      command.execute();
      this.undoStack.push(command);
      this.redoStack = [];
      this.tempLineStart = null;
      this.redraw();
    }
  }

  finishShape() {
    if (this.activeShape.lines.length > 0) {
      const command = new AddShapeCommand(this.shapes, this.activeShape);
      command.execute();
      this.undoStack.push(command);
      this.redoStack = [];
      this.activeShape = new Shape();
      this.tempLineStart = null;
      this.redraw();
    }
  }

  undo() {
    if (this.undoStack.length > 0) {
      const command = this.undoStack.pop();
      command.undo();
      this.redoStack.push(command);
      this.redraw();
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const command = this.redoStack.pop();
      command.execute();
      this.undoStack.push(command);
      this.redraw();
    }
  }

  redraw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw all finalized shapes
    this.shapes.forEach((shape) => shape.draw(this.ctx));

    // Draw the active shape being created
    this.activeShape.draw(this.ctx);
  }
}

// Initialize the drawing program
const canvas = document.getElementById("drawingCanvas");
new DrawingProgram(canvas);
