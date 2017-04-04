(function () {
  //const div = document.getElementById("altitude");
  //context.lineWidth = this.lineThickness;
  const c = document.getElementById('altitude');
  const context = c.getContext('2d');
  const width = 200;
  const height = 600;
  const fontSize = 16;

  function drawLine(lineLength) {
    return function (context, y, lineValue) {
      let localLineLength = lineLength;
      if (lineValue < 0.1 && lineValue > -0.1) {
        localLineLength = 1.5 * localLineLength;
      }

      if (lineValue < -0.1) {
        context.fillStyle = context.shadowColor = window.theme.redColor;
      } else {
        context.fillStyle = context.shadowColor = window.theme.mainColor;
      }
      context.fillRect(100, y, localLineLength, 2);
    }
  }

  const graphicsManager = new GraphicsManager(c);
  const majorLineRenderer = new LineRenderer({
    from: 0,
    to: height,
    lineDistance: 40,
    lineOffset: 20,
    pixelsPerUnit: 40,
    onDrawLine: drawLine(40)
  });

  const minorLineRenderer = new LineRenderer({
    from: 0,
    to: height,
    lineDistance: 40,
    lineOffset: 0,
    pixelsPerUnit: 40,
    onDrawLine: drawLine(20)
  });

  const borderedTextRenderer = new BorderedTextRenderer({
    x: 15,
    y: (height + fontSize) / 2 - 4,
    padding: 10,
    fontHeight: fontSize,
    borderThickness: 1.5,
    font: 'Telegrama'
  });

  graphicsManager.addDrawables([majorLineRenderer, minorLineRenderer, borderedTextRenderer]);
  graphicsManager.startDrawing();

  let altitude = 0;
  setInterval(function () {
    majorLineRenderer.setValue(altitude);
    minorLineRenderer.setValue(altitude);
    borderedTextRenderer.setValue(altitude);
    altitude += 0.011;
  }, 250);
})();
