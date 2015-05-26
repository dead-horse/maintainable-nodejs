var http = require('http');

http.createServer(function (req, res) {
  parseBody(req, function (err, body) {
    if (err) {
      res.statusCode = 500;
      res.end(err.message);
      return;
    }
    var keys = Object.keys(body);
    res.end(keys.join(','));
  });
}).listen(3000);

function parseBody(req, callback) {
  rawBody(req, function (err, content) {
    if (err) return callback(err);
    var body = {};
    try {
      body = JSON.parse(content);

      if (!body || typeof body !== 'object') {
        throw new Error('request body must be object');
      }
    } catch (err) {
      return callback(err);
    }
    return callback(null, body);
  });
}

function rawBody(req, callback) {
  var bufs = [];
  req.on('data', function (data) {
    bufs.push(data);
  });
  req.on('end', function () {
    callback(null, Buffer.concat(bufs));
  });
}
