//var ambient = require('./tessel_modules/ambient');
//var relay = require('./tessel_modules/relay');
var request = require('./helpers/request');
//var wifi = require('./helpers/wifi');
var querystring = require('querystring');
var config = require('./config/config').request;


// Build the post string from an object
var post_light_data = querystring.stringify({
  'type' : 'L',
  'value': '1.335627',
  'date': '2015-07-20',
  'device' : 'f0009a30-00574742-5c6225c2'
});

console.log(config.apiSave);

request.call(config.apiSave, 'POST', post_light_data, function(chunk) {
  console.log(chunk);
});

/*

//connection wifi
wifi.connectWifi(function(data){

  // you're connected
  console.log("Connect emitted", data);

  request.call(config.apiList + 'f0009a30-00574742-5c6225c2', 'GET', '', function(chunk) {

    var resp = JSON.parse(chunk);

    var soundThreshold = parseFloat(resp[0].ConfigAmbientSound.threshold);
    var lightThreshold = parseFloat(resp[0].ConfigAmbientLight.threshold);

    console.log('Sound threshold: ' + soundThreshold);
    console.log('Light threshold: ' + lightThreshold);

    //start Ambient module
    ambient.start(soundThreshold, lightThreshold);

    //start Relay module
    //relay.start();
  });
}, function(data){

  // wifi dropped, probably want to call connect() again
  console.log("Disconnect emitted", data);
});

*/
