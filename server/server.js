const net = require('net');

const server = net.createServer((socket) => {
  console.log('Nuovo client connesso!');

  socket.on('data', (data) => {
    console.log('Ricevuto:', data.toString());
    // Invia i dati ricevuti al processo principale di Electron
    process.send(data.toString());
  });

  socket.on('end', () => {
    console.log('Client disconnesso.');
  });
});

server.listen(3001, '127.0.0.1', () => {
  console.log('Server TCP in ascolto su 127.0.0.1:3001');
});
