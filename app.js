var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var fs = require('fs');


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

app.post('/snap', function(req, res){
  console.log('snap received ...');

  var writeStream = fs.createWriteStream('snap.png');
  writeStream.on('finish', function() {
    console.log('snap written to disk');
    res.sendStatus(200)
  });
  writeStream.write(req);
  writeStream.end();
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