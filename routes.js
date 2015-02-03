var lpScraper = require('./scraper.js');
var url = require('url');

module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.jade');
  });

  app.post('/scrape', function (req, res) {
    var reqUrl = req.body.url;
    if (reqUrl && reqUrl.indexOf('http') != 0) {
      reqUrl = 'http://' + reqUrl;
    }
    if (!reqUrl) {
      res.status(400).send('URL parameter is required, got ' + reqUrl);
    } else {
      var parsedUrl = url.parse(reqUrl);
      if (parsedUrl.host && parsedUrl.host.indexOf('lonelyplanet.com') < 0) {
        console.error('Cannot scrape ' + reqUrl);
        res.status(400).send('URL is not supported ' + reqUrl)
      }
      lpScraper(reqUrl, res);
    }
  });
};