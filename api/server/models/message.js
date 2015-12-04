var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
  
var messageSchema = Schema({
  _room          : { type: String, ref: 'Room' },
  messageContent : String,
  name           : String,
  timeStamp      : Number
});

module.exports = mongoose.model('Message', messageSchema);