application = () => {
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

  class DrawingProgram {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext("2d");
      this.lines = [];
      this.tempLineStart = null;
      // TODO add undo / redo functionality

      this.setupEventListeners();
    }

    setupEventListeners() {
      this.canvas.addEventListener("click", (event) =>
        this.handleLeftClick(event),
      );

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

    handleLeftClick(event) {
      const point = this.getMousePosition(event);

      console.log("FOO click!!!");
      console.log(event);

      if (this.tempLineStart === null) {
        this.tempLineStart = point;
      } else {
        const line = new Line(this.tempLineStart, point);
        this.lines.push(line);
        // this.undoStack.push(line);
        this.tempLineStart = null;
        this.redraw();
      }
    }

    redraw() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.lines.forEach((line) => line.draw(ctx));
    }

    undo() {
      console.log("FOO BAR BAZ");
    }

    redo() {
      console.log("BAR FOO");
    }
  }

  const canvas = document.getElementById("drawingCanvas");
  new DrawingProgram(canvas);
};

window.onLoad = application();
