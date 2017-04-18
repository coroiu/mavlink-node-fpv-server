// Browser client
class MavlinkRPC extends EventEmitter {
  constructor() {
    super();
    //const client = new Eureca.Client({ uri: 'ws://localhost:3000/', prefix: 'eureca.io', transport: 'sockjs' });
    const client = new Eureca.Client({ uri: 'ws://192.168.0.103:3000/', prefix: 'eureca.io', retries: 99999 });
    
    client.exports = {
      onMessage: this._onMessage.bind(this)
      /*onMessage: (event, message, fields) => {
        //console.log(fields);
      }*/
    };

    client.ready(function (link) {
      console.log('Connection ready');
    });
  }

  _onMessage(type, fields) {
    if (fields === null) {
      this.emit(type);
    } else {
      this.emit(type, fields);
      for (var key in fields) {
        if (fields.hasOwnProperty(key)) {
          this.emit(`fields.${key}`, fields[key]);
        }
      }
    }
  }
}
