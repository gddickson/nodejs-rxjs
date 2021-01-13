var http = require('http');
var dt = require('./myfirstmodule');
var cts = require('./constants');
var url = require('url');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.end('The date and time is: ' + dt.myDateTime());
}).listen(8080);