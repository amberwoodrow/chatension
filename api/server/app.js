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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // changed to true because of example

var message = require('./routes/message.js');
app.use('/', message);

module.exports = app;