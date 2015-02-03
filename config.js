var bodyParser = require('body-parser');
var express = require('express');

module.exports = function(app) {
  var config = this;
  
  app.set('views', __dirname + '/views');
  app.use(bodyParser.json()); // for parsing application/json
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode
  // GET /static/style.css etc.
  app.use('/static', express.static(__dirname + '/static'));
  return config;
};
