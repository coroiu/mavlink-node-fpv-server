class GraphicsManager {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d");
    this.drawables = [];
    this.isDrawing = false;
  }

  startDrawing() {
    this.isDrawing = true;
    window.requestAnimationFrame(this._draw.bind(this));
  }

  stopDrawing() {
    this.isDrawing = false;
  }

  addDrawable(drawable) {
    this.drawables.push(drawable);
  }

  addDrawables(drawables) {
    for (var i = 0; i < drawables.length; i++) {
      this.drawables.push(drawables[i]);
    };
  }

  _draw() {
    if (!this.isDrawing) return;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let i = 0; i < this.drawables.length; ++i) {
      this.drawables[i].render(this.context);
    }
    window.requestAnimationFrame(this._draw.bind(this));
  }
}