var bodyParser = require('body-parser');

module.exports = function(app) {
    var config = this;
    
    app.set('views', __dirname + '/views');
    app.use(bodyParser.json()); // for parsing application/json
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencode
    return config;
};
