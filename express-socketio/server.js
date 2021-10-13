// klistra in från tidigare exempel

// klistra in från annat exempel
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});
io.on('connection', function(socket) {
  socket.on('chat', function(data) {
    console.log("Someone chatted: " + data, socket.id);
    let socketId = socket.id
    io.to(socketId).emit('reply', response);
  });
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});