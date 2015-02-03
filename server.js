var express = require('express');
var app     = express();

var config = require('./config.js')(app);
require('./routes.js')(app);


app.listen('8081');
console.log('Magic happens on port 8081');

exports = module.exports = app;