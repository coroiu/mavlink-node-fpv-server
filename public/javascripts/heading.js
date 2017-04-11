(function () {
  //const div = document.getElementById("altitude");
  //context.lineWidth = this.lineThickness;
  const c = document.getElementById('heading');
  const context = c.getContext('2d');
  const width = 600;
  const height = 100;
  const centerX = width / 2;
  const centerY = height / 2;
  const fontSize = 14;
  const arrowWidth = 60;
  const arrowHeight = 30;

  function drawLine(isMajor) {
    return function (context, x, lineValue) {
      //let localLineLength = lineLength;
      context.strokeStyle = context.fillStyle = context.shadowColor = window.theme.mainColor;

      const drops = 10;
      const lineLength = 155;
      const sideSpace = 45;
      context.lineWidth = 2;

      if (isMajor) {
        lineValue = -(Math.round(lineValue) % 360);
        if (lineValue < 0) {
          lineValue = 360 + lineValue;
        }

        let text = null;
        if (lineValue % 45 == 0) {
          text = {
            0: 'N',
            45: 'NE',
            90: 'E',
            135: 'SE',
            180: 'S',
            225: 'SW',
            270: 'W',
            315: 'NW'
          }[lineValue];
        } else {
          text = lineValue + '';
        }

        const textWidth = context.measureText(text).width;
        context.font = `${fontSize}px '${window.theme.numberFont}'`;
        context.fillText(text, x - textWidth/2, 19);
      }

      context.beginPath();
      context.moveTo(x, 40);

      if (isMajor) {
        context.lineTo(x, 80);
      } else {
        context.lineTo(x, 60);
      }

      context.stroke();
    }
  }

  const graphicsManager = new GraphicsManager(c);
  const majorLineRenderer = new LineRenderer({
    from: 0,
    to: width,
    lineDistance: 80,
    lineOffset: -20,
    pixelsPerUnit: 80/15,
    onDrawLine: drawLine(true)
  });

  const minorLineRenderer1 = new LineRenderer({
    from: 0,
    to: width,
    lineDistance: 80,
    lineOffset: -45,
    pixelsPerUnit: 80/15,
    onDrawLine: drawLine(false)
  });

  const minorLineRenderer2 = new LineRenderer({
    from: 0,
    to: width,
    lineDistance: 80,
    lineOffset: -75,
    pixelsPerUnit: 80/15,
    onDrawLine: drawLine(false)
  });

  // const minorLineRenderer = new LineRenderer({
  //   from: 0,
  //   to: height,
  //   lineDistance: 40,
  //   lineOffset: 0,
  //   pixelsPerUnit: 40,
  //   onDrawLine: drawLine(20)
  // });
  
  const arrowRenderer = new ManualRenderer(function (context) {
    context.beginPath();
    context.moveTo(centerX - arrowWidth/2, 2);
    context.lineTo(centerX + arrowWidth/2, 2);
    context.lineTo(centerX, 2 + arrowHeight);
    context.lineTo(centerX - arrowWidth/2, 2);
    context.stroke();
  })

  graphicsManager.addDrawables([majorLineRenderer, minorLineRenderer1, minorLineRenderer2, arrowRenderer]);
  graphicsManager.startDrawing();

  let x = 0;
  setInterval(function () {
    majorLineRenderer.setValue(x % 360);
    minorLineRenderer1.setValue(x % 360);
    minorLineRenderer2.setValue(x % 360);
    //graphicsManager.setRotation(Math.sin(y));
    x += 0.2;
  }, 33);
})();
