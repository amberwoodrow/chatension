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
  // serve room with messages
  // when username is created find room by it's unique url
});

// Post to messages
router.post('/api/chatension', function(req, res, next) {
  newMessage = new Message({
    _room: req.body.url,
    messageContent: req.body.text,
    name: req.body.name,
    timeStamp: req.body.id
  });
  newMessage.save(function(err,data){
    if(err){
      res.json({'message':err});
    } else{
      console.log(data);
      res.json(data);
    }
  });
});

// Story
// .findOne({ title: 'Once upon a timex.' })
// .populate('_creator')
// .exec(function (err, story) {
//   if (err) return handleError(err);
//   console.log('The creator is %s', story._creator.name);
//   // prints "The creator is Aaron"
// });

module.exports = router;
