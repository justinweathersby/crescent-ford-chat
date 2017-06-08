//modules
const config = require('./config');
const ioevent = require('./socket');
const express = require('express');
const app = express();
const http = require('http');
const socketio = require('socket.io');

const server = http.createServer(app);
const io = socketio(server);

io.on('connection', ioevent.on_connection);

server.listen(config.server_listening_port, function() {
    console.log('server listenining on port ' + config.server_listening_port);
});

