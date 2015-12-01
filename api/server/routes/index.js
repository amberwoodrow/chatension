var express = require('express');
var router = express.Router();
var request = require("request");

router.get('/', function(req, res) {
  res.send("<html><head><meta charset='UTF-8'></head><body>hi</body></html>");
});

module.exports = router;
