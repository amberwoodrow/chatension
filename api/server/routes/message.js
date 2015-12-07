var express = require('express');
var router = express.Router();
var Room = require('../models/room.js');
var Message = require('../models/message.js');

// GET room, if room doesn't exist it creates one
router.get('/api/room', function(req, res, next) {

  Room.findOne({"url": req.query.currentUrl})
  .populate('_messages')
  .exec(function(err, data){
    if(err){
      res.json({'message': err});
    } else {
      if (data === null) {
        // create room
        newRoom = new Room({
          url: req.query.currentUrl,
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
        // found room, returns messages
        res.json(data);
      }
    }
  });
  // serve room with messages
  // when username is created find room by it's unique url
});

// aaron.stories.push(story1);
// aaron.save(callback);

// Post to messages
router.post('/api/message', function(req, res, next) {

  Room.findOne({"url": req.body.url})
  .exec(function(err, room) {
    var newMessage = new Message({
      _room: room._id,
      messageContent: req.body.text,
      name: req.body.name,
      timeStamp: req.body.id
    });

    room._messages.push(newMessage);

    room.save(function(err, data){
      if(err){ res.json({'message':err}); }

      newMessage.save(function(err, data){
        if(err){ res.json({'message':err}); }
      });
    });
  });



});

module.exports = router;
