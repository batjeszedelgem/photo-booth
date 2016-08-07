var express = require('express');
var app = express();
var http = require('http').Server(app);
var uuid = require('node-uuid');
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

app.get('/full', function(req, res){
  res.sendFile(__dirname + '/full.html');
});

app.post('/snap', function(req, res){
  var snapFileName = uuid.v1() + '.png';

  var writeStream = fs.createWriteStream('snaps/' + snapFileName);

  req.on('data', function(chunk) {
    var successfulWrite = writeStream.write(chunk);
  });

  req.on('finish', function() {
    writeStream.end();
  });
  
  req.on('error', function(e) {
    res.sendStatus(500);
  });

  writeStream.on('finish', function() {
    console.log('snap written to disk');
  });
});


io.on('connection', function(socket){
  console.log('connected ...');
  socket.on('disconnect', function(){
    console.log('disconnected!');
  });
});

io.on('connection', function(socket){
  socket.on('snap', function() {
    console.log('emitting snap ...');
    
    io.emit('snap');
  });

  socket.on('redo', function() {
    console.log('emitting redo ...');

    io.emit('redo');
  });

  socket.on('done', function() {
    console.log('emitting done ...');

    io.emit('done');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});