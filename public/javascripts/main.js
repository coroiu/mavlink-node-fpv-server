/*(function () {

})();*/

//const div = document.getElementById("altitude");
const theme = {
  mainColor: '#FB7122',
  redColor: '#ff0000'
};

const c = document.getElementById("altitude");
const ctx = c.getContext("2d");
const width = 200;
const height = 600;
const fontSize = 16;

ctx.font = fontSize + "px 'Telegrama'";
ctx.lineWidth = 1.5;

const pixelsPerMeter = 25;
const textWidth = ctx.measureText('00.0').width;
const textHeight = fontSize - 4;
const textX = 10;
const textY = (height + fontSize) / 2;
const textPadding = 10;

const groundLineWidth = 50;
const lineHeight = 2;

const majorLineWidth = 30;
const majorLineDistance = 50;

const minorLineWidth = 15;
const minorLineDistance = 25;

let altitude = 0;

setInterval(function () {
  const drawLines = function (options) {
    //from, to, lineWidth, lineHeight, lineDistance, color
    for (let y = options.from; y < options.to; y += options.lineDistance) {
      const lineAltitude = altitude + (height / (2*pixelsPerMeter)) - (y / pixelsPerMeter);
      let lineWidth = options.lineWidth;

      if (lineAltitude < 0.1 && lineAltitude > -0.1) {
        lineWidth = 1.5 * options.lineWidth;
      }

      if (lineAltitude < 0) {
        ctx.fillStyle = options.subZeroColor;
      } else {
        ctx.fillStyle = options.color;
      }
      ctx.fillRect(85, y, lineWidth, lineHeight);
    }  
  };

  const offset = (altitude * pixelsPerMeter) - lineHeight;
  ctx.clearRect(0, 0, width, height);
  //ctx.beginPath();
  drawLines({
    from: offset % majorLineDistance,
    to: height,
    lineWidth: majorLineWidth,
    lineDistance: majorLineDistance,
    subZeroColor: '#ff0000',
    color: theme.mainColor
  });

  drawLines({
    from: offset % minorLineDistance,
    to: height,
    lineWidth: minorLineWidth,
    lineDistance: minorLineDistance,
    subZeroColor: '#ff0000',
    color: theme.mainColor
  });
  
  let text = '';
  if (altitude < 10) {
    text = (Math.round(altitude * 100) / 100).toString();
  } else if (altitude < 100) {
    text = (Math.round(altitude * 10) / 10).toString();
  } else {
    text = Math.round(altitude).toString();
  }

  ctx.fillStyle = theme.mainColor;
  ctx.fillText(text, textX, textY);

  ctx.beginPath();
  ctx.strokeStyle = theme.mainColor;
  ctx.moveTo(textX - textPadding, textY - textHeight - textPadding); // top left
  ctx.lineTo(textX - textPadding, textY + textPadding); // bottom left
  ctx.lineTo(textX + textWidth + textPadding, textY + textPadding); // bottom right
  ctx.lineTo(textX + textWidth + textPadding + 10, textY - textHeight/2); // center right
  ctx.lineTo(textX + textWidth + textPadding, textY - textHeight - textPadding); // top right
  ctx.lineTo(textX - textPadding, textY - textHeight - textPadding); // top left
  ctx.stroke();

  altitude += 0.011;
}, 250);
