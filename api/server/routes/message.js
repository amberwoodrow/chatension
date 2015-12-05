var express = require('express');
var router = express.Router();
var Room = require('../models/room.js');
var Message = require('../models/message.js');

// GET room, if room doesn't exist it creates one
router.get('/api/chatension', function(req, res, next) {

  Room.findOne({"url": req.body.url}, function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      if (data === null) {
        // createroom
        newRoom = new Room({
          _url: req.query.currentUrl,
        });
        newRoom.save(function(err, data){
          if(err){
            res.status(401).json({"Error": err+", Could not create new room"});
          } else {
            // better handle success in extension, tell user they created a room
            console.log("Success: New room created");
            res.json(data);
          }
        });
      } else {
        res.json(data);
      }
    }
  });


  // db.collection.find({ "fieldToCheck" : { $exists : true, $ne : null } })

  // when username is created find room by it's unique url
  // if room doesn't exsist create one and tell the user they are they are the first in the room
  // serve room with messages
});

// Post to messages
router.post('/api/chatension', function(req, res, next) {
  // when message is posted add messages to room by sending url, name, message, timestamp
});

module.exports = router;
