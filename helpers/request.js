var http = require('http');
var config = require('../config/config').request;

module.exports = {
  call: function(path, method, data, callback) {
    // An object of options to indicate where to post to
    var options = {
      host: config.host,
      port: config.port,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        //'Content-Length': data.length,
    		'Authorization' : config.authorization
      }
    };

    // Set up the request
    var req = http.request(options, function(res) {
      res.setEncoding('utf8');
      res.on('data', callback);
    });

    // post the data
    if(data)
    {
      req.write(data);
    }

    req.end();
  }
}
