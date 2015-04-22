var express = require('express');
var app = express();
var socketIO = require('socket.io');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

var server = app.listen(8000, function (err) {
    if (!err) {
        console.log('listen : port 8000');
    }
});

var io = socketIO.listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('image', function (data) {
        io.sockets.emit('image', data);
    });
});
