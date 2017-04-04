class LineRenderer {
  constructor(options) {
    this.from = options.from;
    this.to = options.to;
    this.lineDistance = options.lineDistance;
    this.lineOffset = options.lineOffset;
    //this.lineThickness = options.lineThickness;
    this.pixelsPerUnit = options.pixelsPerUnit;
    this.value = 0;
    this.onDrawLine = options.onDrawLine;
  }

  /**
   * Should be called by main render thread.
   * @param  {context} context Context of a cavnas to draw to.
   * @return nothing
   */
  render(context) {
    const offset = (this.value * this.pixelsPerUnit);
    const start = this.from + offset % this.lineDistance + this.lineOffset;
    for (let y = start; y < this.to; y += this.lineDistance) {
      const lineValue = this.value + (this.to / (2*this.pixelsPerUnit)) - (y / this.pixelsPerUnit);
      this.onDrawLine(context, y, lineValue);
    }
  }

  setValue(value) {
    this.value = value;
  }
}