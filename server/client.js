const net = require('net');

class TCPClient {
  sendMessage(host, port, message, callback) {
    const client = net.createConnection({ host, port }, () => {
      console.log(`Connesso al server su ${host}:${port}`);
      client.write(message);
    });

    client.on('data', (data) => {
      console.log('Risposta dal server:', data.toString());
      if (callback) callback(null, data.toString());
      client.end();
    });

    client.on('end', () => {
      console.log('Connessione chiusa dal server.');
    });

    client.on('error', (err) => {
      console.error('Errore nella connessione:', err.message);
      if (callback) callback(err);
    });

    client.on('close', () => {
      console.log('Connessione completamente chiusa.');
    });
  }
}

module.exports = TCPClient;
