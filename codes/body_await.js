// node_modules/.bin/regenerator -r codes/body_await.js | node
//
var http = require('http');

http.createServer(function (req, res) {
  parseBody(req).then(onbody, onerror);

  function onbody(body) {
    var keys = Object.keys(body);
    res.end(keys.join(','));
  }
  function onerror(err) {
    res.statusCode = 500;
    res.end(err.message);
  }
}).listen(3000);

async function parseBody(req) {
  var content = await rawBody(req);
  var body = JSON.parse(content);
  if (!body || typeof body !== 'object') {
    throw new Error('request body must be object');
  }
  return body;
}

function rawBody(req) {
  return new Promise(function (resolve, reject) {
    var bufs = [];
    req.on('data', function (data) {
      bufs.push(data);
    });
    req.on('end', function () {
      resolve(Buffer.concat(bufs));
    });
  });
}
