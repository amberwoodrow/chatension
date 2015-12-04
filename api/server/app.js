var dotenv = require('dotenv');
dotenv.load();

var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGO_URI);

var routes = require('./routes/index');
var server = require('http').Server(app); 
var io = require('socket.io')(server);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // changed to true for new api

// var routes = require('./routes/index');
// app.use('/', routes);

var room = require('./routes/room.js');
var message = require('./routes/message.js');

app.use('/', room);
app.use('/', message);

// io.on('connect', function(socket){
//   socket.on('userAndMessage', function (data) {
//     console.log(data);
//     io.emit('data', data);
//     // io.emit('data', JSON.stringify(data));
//   });
// });

module.exports = app;