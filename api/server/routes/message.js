var express = require('express');
var router = express.Router();
var Room = require('../models/room.js');
var Message = require('../models/message.js');

router.post('/message', function(req, res, next) {
  // when message is posted add messages to room by sending url, name, message, timestamp
});

module.exports = router;
