var qs = require('querystring');
var http = require('http');

http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  var name = query.name || '';
  res.send(name.trim());
}).listen(3000);
