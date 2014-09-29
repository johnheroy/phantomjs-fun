var args = require('system').args;
var cityOrZipcode = args.slice(4).join(' ');
var locationQuery = encodeURI(cityOrZipcode);
var queryURL = 'http://www.wunderground.com/cgi-bin/findweather/hdfForecast?query=' + locationQuery;

var casper = require('casper').create({
  pageSettings: {
    loadImages: false,
    loadPlugins: false
  }
});

console.log('Getting the local temp in the ' + cityOrZipcode + '...');

casper.start(queryURL, function(){
  var currentTempHTML = this.getHTML('span.wx-data[data-variable="temperature"] span.wx-value');
  var currentTemp = parseInt(currentTempHTML);
  var unit = this.getHTML('span.wx-data[data-variable="temperature"] span.wx-unit');
  console.log(currentTemp, unit);
});

casper.run(function(){
  this.exit();
});