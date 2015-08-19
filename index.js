var ambient = require('./tessel_modules/ambient');
var relay = require('./tessel_modules/relay');
var request = require('./helpers/request');
var wifi = require('./helpers/wifi');
var querystring = require('querystring');
var config = require('./config/config').request;
var tessel = require('tessel');

var deviceId = tessel.deviceId();
var deviceRegEx = /(([0-9]|[A-Z]){8}-([0-9]|[A-Z]){8}-([0-9]|[A-Z]){8})/gi;
var uniqueId = deviceRegEx.exec(deviceId)[0];

//connection wifi
wifi.connectWifi(function(data){

  // you're connected
  console.log("Connect emitted", data);

  request.call(config.apiList + uniqueId, 'GET', '', function(chunk) {

    var resp = JSON.parse(chunk);

    var soundThreshold = parseFloat(resp[0].ConfigAmbientSound.threshold);
    var lightThreshold = parseFloat(resp[0].ConfigAmbientLight.threshold);

    console.log('Sound threshold: ' + soundThreshold);
    console.log('Light threshold: ' + lightThreshold);

    //start Ambient module
    ambient.start(soundThreshold, lightThreshold, uniqueId);

    //start Relay module
    //relay.start();
  });
}, function(data){

  // wifi dropped, probably want to call connect() again
  console.log("Disconnect emitted", data);
});
