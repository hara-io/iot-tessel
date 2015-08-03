var http = require('http');

// Build the post string from an object
var post_data = querystring.stringify({
  'type' : 'S',
  'value': '1.335627',
  'date': '2015-07-20',
  'device' : 'tessel1'
});

// An object of options to indicate where to post to
var post_options = {
  host: 'localhost',
  port: '3000',
  path: '/tessel/ambient/save',
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': post_data.length,
		'Authorization' : 'Basic dmFsZXJpbzp2YWxlcmlvMQ=='
  }
};

// Set up the request
var post_req = http.request(post_options, function(res) {
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('Response: ' + chunk);
  });
});

// post the data
post_req.write(post_data);
post_req.end();
