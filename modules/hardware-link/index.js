const mavlink = require('mavlink');
const mav = new mavlink(1,1,"v1.0",["common", "ardupilotmega"]);

const SerialPort = require('serialport');
const port = new SerialPort('/dev/ttyACM0', {
  baudRate: 115200
});

mav.on("ready", function() {
  //parse incoming serial data
  port.on('data', function(data) {
    mav.parse(data);
  });
  
  //listen for messages
  /*mav.on("message", function(message) {
    console.log(message);
  });*/

  /*mav.on("ATTITUDE", function(message, fields) {
    console.log(fields);
  });*/

  mav.on("VFR_HUD", function(message, fields) {
    //console.log(fields);
  });

});

module.exports = {};