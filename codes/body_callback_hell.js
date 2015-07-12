var http = require('http');

http.createServer(function (req, res) {
  rawBody(req, function (err, content) {
    if (err) {
      res.status = 500;
      res.end(err.message);
    } else {
      var body;
      try {
        body = JSON.parse(content);
        if (!body || typeof body !== 'object') {
          throw new Error('request body must be object');
        }
      } catch (err) {
        res.statusCode = 500;
        res.end(err.message);
        return;
      }
      var keys = Object.keys(body);
      res.end(keys.join(','));
    }
  });
}).listen(3000);

function rawBody(req, callback) {
  var bufs = [];
  req.on('data', function (data) {
    bufs.push(data);
  });
  req.on('end', function () {
    callback(null, Buffer.concat(bufs));
  });
}
