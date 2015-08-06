// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This ambient module example console.logs
ambient light and sound levels and whenever a
specified light or sound level trigger is met.
*********************************************/

var tessel = require('tessel');
var ambientlib = require('ambient-attx4');
var request = require('../helpers/request');
var config = require('../config/config');
var querystring = require('querystring');

module.exports = {
  start: function(soundThreshlod, lightThreshlod) {

    var ambient = ambientlib.use(tessel.port[config.ambient.port]);

    //On Ready: Wait for the module to connect
    ambient.on('ready', function () {
      // Get points of light and sound data.
      setInterval( function () {
        ambient.getLightLevel( function(err, ldata) {
          if (err) throw err;
          ambient.getSoundLevel( function(err, sdata) {
            if (err) throw err;
            console.log("Light level:", ldata.toFixed(8), " ", "Sound Level:", sdata.toFixed(8));
        });
      })}, 500); // The readings will happen every .5 seconds unless the trigger is hit

      ambient.setLightTrigger(lightThreshlod);

      // Set a light level trigger
      // The trigger is a float between 0 and 1
      ambient.on('light-trigger', function(data) {
        console.log("Our light trigger was hit:", data);

        // Build the post string from an object
        var post_light_data = querystring.stringify({
          'type' : 'L',
          'value': '1.335627',
          'date': '2015-07-20',
          'device' : 'f0009a30-00574742-5c6225c2'
        });

        request.call(config.request.apiSave, 'POST', post_light_data, function(chunk) {
          console.log(chunk);
        });

        // Clear the trigger so it stops firing
        ambient.clearLightTrigger();
        //After 1.5 seconds reset light trigger
        setTimeout(function () {

            ambient.setLightTrigger(lightThreshlod);

        },1500);
      });

      // Set a sound level trigger
      // The trigger is a float between 0 and 1
      ambient.setSoundTrigger(soundThreshlod);

      ambient.on('sound-trigger', function(data) {
        console.log("Something happened with sound: ", data);

        // Build the post string from an object
        var post_sound_data = querystring.stringify({
          'type' : 'S',
          'value': '1.335627',
          'date': '2015-07-20',
          'device' : 'f0009a30-00574742-5c6225c2'
        });

        request.call(config.request.apiSave, 'POST', post_sound_data, function(chunk) {
          console.log(chunk);
        });

        // Clear it
        ambient.clearSoundTrigger();

        //After 1.5 seconds reset sound trigger
        setTimeout(function () {

            ambient.setSoundTrigger(soundThreshlod);

        },1500);

      });
    });

    //On Error
    ambient.on('error', function (err) {
      console.log(err)
    });
  }
}
