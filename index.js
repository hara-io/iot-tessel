var ambient = require('./tessel_modules/ambient');
var relay = require('./tessel_modules/relay');
var request = require('./helpers/request');
var wifi = require('./helpers/wifi');
var querystring = require('querystring');
var config = require('./config/config').request;

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
