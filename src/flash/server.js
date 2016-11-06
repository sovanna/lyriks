const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const io = require('socket.io');

const _app = express();
const _server = http.Server(_app);
const _io = io(_server);

_app.use(bodyParser.urlencoded({
  extended: true,
  limit: '3mb'
}));

_app.use(bodyParser.json({
  limit: '3mb',
  type: 'application/json'
}));

_app.post('/flash', (req, res) => {
  const _body = req.body;
  const _client = _io.sockets.connected[_body.client_id];

  console.log(_body.lyrics);

  if (_client) {
    _client.emit('lyriks', _body.lyrics);
    return res.status(200).send('send lyriks back to client\n');
  }

  return res.status(200).send('send lyriks to nowhere\n');
});

_io.on('connection', (socket) => {
  socket.emit('register', socket.id);
});

_server.listen(5002, () => {
  console.log('* Running on http://localhost:5002/ (Press CTRL+C to quit)');
})