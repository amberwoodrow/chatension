var fs = require('fs'); // .
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var server = require('http').Server(app); 
var io = require('socket.io')(server);

var MESSAGES_FILE = path.join(__dirname, 'messages.json'); // for writing to messages.json
// app.set('port', (process.env.PORT || 3000)); // don't know if needed

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // changed to true for new api

app.use(express.static(path.join(__dirname, '../client', 'public')));
app.use('/', routes);

app.use('/', express.static(path.join(__dirname, 'public'))); // from example

io.on('connect', function(socket){
  socket.on('userAndMessage', function (data) {
    console.log(data);
    io.emit('data', data);
    // io.emit('data', JSON.stringify(data));
  });
});


module.exports = app;





app.get('/api/messages', function(req, res) {
  fs.readFile(MESSAGES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/api/messages', function(req, res) {  
  fs.readFile(MESSAGES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var messages = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newMessage = {
      id: Date.now(),
      name: req.body.name,
      text: req.body.text,
    };
    messages.push(newMessage);
    fs.writeFile(MESSAGES_FILE, JSON.stringify(messages, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.setHeader('Cache-Control', 'no-cache');
      res.json(messages);
    });
  });
});


app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
