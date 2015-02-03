module.exports = function (app) {
  app.get('/', function (req, res) {
    res.render('index.jade');
  });

  app.post('/scrape', function (req, res) {
  	var url = req.body.url;

  	if (!url) {
  		res.status(400).send('URL parameter is required, got ' + url);
  	} else {
  		require('./scraper.js')(url, res);
  	}
  });
};