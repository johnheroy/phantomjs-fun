var args = require('system').args;
var zipcode = args[args.length - 1];
var queryURL = 'http://www.wunderground.com/cgi-bin/findweather/hdfForecast?query=' + zipcode;

var casper = require('casper').create({
  pageSettings: {
    loadImages: false,
    loadPlugins: false
  }
});

console.log('Getting the local temp in the ' + zipcode + '...');

casper.start(queryURL, function(){
  var currentTempHTML = this.getHTML('span.wx-data[data-variable="temperature"] span.wx-value');
  var currentTemp = parseInt(currentTempHTML);
  var unit = this.getHTML('span.wx-data[data-variable="temperature"] span.wx-unit');
  console.log(currentTemp, unit);
});

casper.run(function(){
  this.exit();
});