var express = require('express');
var router = express.Router();
var Room = require('../models/room.js');
var Message = require('../models/message.js');

// gets room, if room doesn't exist it creates one
router.get('/room', function(req, res, next) {
  // when username is created find room by it's unique url
  // if room doesn't exsist create one and tell the user they are they are the first in the room
  // serve room with messages
});

module.exports = router;
