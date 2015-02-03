var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var url = require('url');

var extractTextFromInfoList = function($, siblingClass) {
  return $('dt.' + siblingClass).next('.info-list__content').text();
};

var getSliderImages = function($) {
  var images = [];
  $('.js-slide.slider__slide img').each(function(i, el) {
    images.push($(this).attr('src') || $(this).attr('data-src'));
  });

  if (!images.length) {
    $('img.media-gallery__img--single').each(function(i, el) {
      images.push($(this).attr('src'));
    });
  }
  return images;
};

var convertMatchedPriceToScale = function(price) {
  if (price < 10) {
    return '$';
  } else if (price < 20) {
    return '$$';
  } else if (price < 30) {
    return '$$$'
  } else {
    return '$$$$';
  }
}

var getScaledPrice = function($) {
  var priceRaw = extractTextFromInfoList($, 'icon--bureau-de-change--before');
  var matchedPrices = priceRaw.match(/(\$(\d+(\.\d+)*))/);
  
  if(matchedPrices && matchedPrices[2]) {
    var numericPrice = parseInt(matchedPrices[2], 10);
    return convertMatchedPriceToScale(numericPrice);
  }
  return '';
};

module.exports = function(url, res) {
  console.log('Attempting to scrape ' + url);
  request(url, function(error, response, html){
    if(!error){
      var $ = cheerio.load(html);

      var json = {};
      json.name = $('.copy--h1').text().trim();
      json.address =
        extractTextFromInfoList($, 'icon--map--before').trim() + ' ' +
        extractTextFromInfoList($, 'icon--place--pin--before').trim();
      json.telephone = extractTextFromInfoList($, 'icon--contact--before').trim();
      json.website = extractTextFromInfoList($, 'icon--mouse--before').trim();
      json.description = $('.ttd__section--description').text().trim();
      json.price = getScaledPrice($);
      json.images = getSliderImages($);

      json.prettyJson = JSON.stringify(json, null, '  ');

      res.render('index.jade', {scraped: json});
    } else {
      console.error('Error scraping ' + url, error);
      res.status(500).json(error);
    }
  })
}