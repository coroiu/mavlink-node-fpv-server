(function () {
  //const div = document.getElementById("altitude");
  //context.lineWidth = this.lineThickness;
  const c = document.getElementById('attitude');
  const context = c.getContext('2d');
  const width = 600;
  const height = 600;
  const centerX = width / 2;
  const centerY = height / 2;
  const fontSize = 16;

  function drawLine() {
    return function (context, y, lineValue) {
      //let localLineLength = lineLength;
      context.strokeStyle = context.fillStyle = context.shadowColor = window.theme.mainColor;
      if (lineValue < 0.1 && lineValue > -0.1) {
        //localLineLength = 1.5 * localLineLength;
        return;
        //context.fillStyle = context.shadowColor = window.theme.redColor;
      }

      if (lineValue < -0.1) {
        //context.fillStyle = context.shadowColor = window.theme.redColor;
      } else {
      }

      // HORIZONTRAL LINES
      const drops = 10;
      const lineLength = 155;
      const sideSpace = 45;
      context.lineWidth = 2;
      context.beginPath();
      if (lineValue < -0.1) {
        context.moveTo(sideSpace, y - drops);
      } else {
        context.moveTo(sideSpace, y + drops);
      }
      context.lineTo(sideSpace, y);
      context.lineTo(sideSpace + lineLength, y);

      if (lineValue < -0.1) {
        context.moveTo(width - sideSpace, y - drops);
      } else {
        context.moveTo(width - sideSpace, y + drops);
      }
      context.lineTo(width - sideSpace, y);
      context.lineTo(width - sideSpace - lineLength, y);
      context.stroke();

      // TEXT
      let textY;
      if (lineValue < -0.1) {
        textY = y - drops/2 + 6;
      } else {
        textY = y + drops/2 + 6;
      }
      lineValue = Math.abs(Math.round(lineValue*100)/100);
      const textWidth = context.measureText(lineValue).width;
      const textSpacing = 20;
      context.font = `${fontSize}px '${window.theme.numberFont}'`;
      context.fillText(lineValue, sideSpace - textWidth - textSpacing, textY);
      context.fillText(lineValue, width - sideSpace + textSpacing, textY);

      // CROSSHAIR
      const crosshairWidth = 75;
      const crosshairHeight = 10;
      const crosshairMiddleWidth = 20;
      const crosshairMiddleHeight = 10;
      context.beginPath();
      context.moveTo(centerX - crosshairWidth/2, centerY);
      context.lineTo(centerX - crosshairMiddleWidth/2, centerY);
      context.lineTo(centerX, centerY + crosshairMiddleHeight);
      context.lineTo(centerX + crosshairMiddleWidth/2, centerY);
      context.lineTo(centerX + crosshairWidth/2, centerY);
      context.stroke();
    }
  }

  const graphicsManager = new GraphicsManager(c);
  const majorLineRenderer = new LineRenderer({
    from: 0,
    to: height,
    lineDistance: 150,
    lineOffset: 0,
    pixelsPerUnit: 150/5,
    onDrawLine: drawLine()
  });

  // const minorLineRenderer = new LineRenderer({
  //   from: 0,
  //   to: height,
  //   lineDistance: 40,
  //   lineOffset: 0,
  //   pixelsPerUnit: 40,
  //   onDrawLine: drawLine(20)
  // });

  // const borderedTextRenderer = new BorderedTextRenderer({
  //   x: 15,
  //   y: (height + fontSize) / 2 - 4,
  //   padding: 10,
  //   fontHeight: fontSize,
  //   borderThickness: 1.5,
  //   font: 'Telegrama'
  // });

  graphicsManager.addDrawable(majorLineRenderer);
  // graphicsManager.addDrawables([majorLineRenderer, minorLineRenderer, borderedTextRenderer]);
  graphicsManager.startDrawing();

  let x = 0;
  let y = 0;
  setInterval(function () {
    majorLineRenderer.setValue(Math.sin(x)*5);
    graphicsManager.setRotation(Math.sin(y));
    x += 0.05 + 0.1 * Math.random();
    y += 0.05 + 0.05 * Math.random();
  }, 33);
})();
