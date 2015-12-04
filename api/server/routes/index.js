var express = require('express');
var router = express.Router();
var request = require("request");
var fs = require('fs');
var path = require('path');

var MESSAGES_FILE = path.join(__dirname, '../../messages.json'); // for writing to messages.json

router.get('/api/messages', function(req, res) {
  fs.readFile(MESSAGES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

router.post('/api/messages', function(req, res) {  
  fs.readFile(MESSAGES_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var messages = JSON.parse(data);
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

module.exports = router;
