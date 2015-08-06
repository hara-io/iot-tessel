/* the wifi-cc3000 library is bundled in with Tessel's firmware,
 * so there's no need for an npm install. It's similar
 * to how require('tessel') works.
 */
var wifi = require('wifi-cc3000');
var config = require('../config/config').wifi;

var network = config.network; // put in your network name here
var pass = config.pass; // put in your password here, or leave blank for unsecured
var security = config.security; // other options are 'wep', 'wpa', or 'unsecured'
var timeouts = 0;

function connect(cbConnect, cbDisconnect){
  wifi.connect({
    security: security,
    ssid: network,
    password: pass,
    timeout: 30 // in seconds
  }).on('connect', cbConnect)
  .on('disconnect', cbDisconnect)
  .on('timeout', function(err){
    // tried to connect but couldn't, retry
    console.log("timeout emitted");
    timeouts++;
    if (timeouts > 2) {
      // reset the wifi chip if we've timed out too many times
      //powerCycle();
    } else {
      // try to reconnect
      //connect(cbConnect, cbDisconnect);
    }
  });
}

// reset the wifi chip progammatically
function powerCycle(){
  // when the wifi chip resets, it will automatically try to reconnect
  // to the last saved network
  wifi.reset(function(){
    timeouts = 0; // reset timeouts
    console.log("done power cycling");
    // give it some time to auto reconnect
    setTimeout(function(){
      if (!wifi.isConnected()) {
        // try to reconnect
        connect();
      }
      }, 20 *1000); // 20 second wait
  })
}

wifi.on('timeout', function(err){
  // tried to connect but couldn't, retry
  console.log("timeout emitted");
  timeouts++;
  if (timeouts > 2) {
    // reset the wifi chip if we've timed out too many times
    powerCycle();
  } else {
    // try to reconnect
    connect();
  }
});

wifi.on('error', function(err){
  // one of the following happened
  // 1. tried to disconnect while not connected
  // 2. tried to disconnect while in the middle of trying to connect
  // 3. tried to initialize a connection without first waiting for a timeout or a disconnect
  console.log("error emitted", err);
});

module.exports =  {
  connectWifi: function(cbConnect, cbDisconnect){
    connect(cbConnect, cbDisconnect);
  }
}
