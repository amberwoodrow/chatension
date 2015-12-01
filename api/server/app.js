var fs = require('fs'); // .
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var server = require('http').Server(app); 
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, '../client', 'public')));
app.use('/', routes);

io.on('connect', function(socket){
  socket.on('userAndMessage', function (data) {
    console.log(data);
    io.emit('data', data);
    // io.emit('data', JSON.stringify(data));
  });
});


module.exports = app;