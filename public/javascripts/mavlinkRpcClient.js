// Browser client
class MavlinkRPC {
  constructor() {
    //const client = new Eureca.Client({ uri: 'ws://localhost:3000/', prefix: 'eureca.io', transport: 'sockjs' });
    const client = new Eureca.Client();
    
    client.exports = {
      onMessage: (event, message, fields) => {
        //console.log(fields);
      }
    };

    client.ready(function (link) {
      console.log('Connection ready');
    });
  }

  _onMessage(message) {    
  }
}