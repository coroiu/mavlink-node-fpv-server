const EventEmitter = require('events');
const net = require('net');

class RemoteLink extends EventEmitter {
  constructor() {
    super();
    this.socket = null;
    this.server = net.createServer((socket) => {
      if (this.socket != null) this.socket.end();
      this.socket = socket;
      this.socket.on('data', this._handleData);
      console.log('New drone connection');
      //socket.write('Echo server\r\n');
      //socket.pipe(socket);
    });

    this.server.listen(7800, '0.0.0.0');
  }

  _handleData(rawData) {
    const data = JSON.parse(rawData);
    this.emit(data.type, data.fields);
  }
}


module.exports = new RemoteLink();