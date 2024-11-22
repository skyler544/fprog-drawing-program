class DrawingProgram {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.setupEventListeners();
  }

  setupEventListeners() {
    document
      .getElementById("undo")
      .addEventListener("click", () => this.undo());
    document
      .getElementById("redo")
      .addEventListener("click", () => this.redo());
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
