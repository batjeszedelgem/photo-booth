var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);


app.use(express.static('.'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/viewer', function(req, res){
  res.sendFile(__dirname + '/viewer.html');
});

app.get('/controller', function(req, res){
  res.sendFile(__dirname + '/controller.html');
});

io.on('connection', function(socket){
  console.log('connected ...');
  socket.on('disconnect', function(){
    console.log('disconnected!');
  });
});

io.on('connection', function(socket){
  socket.on('snap', function(){
    io.emit('snap');
  });

  socket.on('redo', function(){
    io.emit('redo');
  });

  socket.on('done', function(){
    io.emit('done');
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});