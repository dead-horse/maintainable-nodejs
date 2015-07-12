var EventEmitter = require('events').EventEmitter;
var urllib = require('urllib');
var util = require('util');
var fs = require('mz/fs');
var ms = require('ms');

function Checker(url, path) {
  this.url = url;
  this.path = path;
  this.onerror = this.onerror.bind(this);
  this.start();
  EventEmitter.call(this);
  setImmediate(function () {
    if (!this.listeners('error').length) {
      this.on('error', defaultErrorHandler);
    }
  }.bind(this));
};

util.inherits(Checker, EventEmitter);

Checker.prototype.shoot = function () {
  var self = this;
  return urllib.request(self.url)
    .then(function (res) {
      return fs.writeFile(self.path, res.data);
    });
};
Checker.prototype.start = function () {
  var self = this;
  setInterval(function () {
    self.shoot().catch(self.onerror); // 捕获 error 时间
  }, ms('1s'));
};

Checker.prototype.onerror = function (err) {
  this.emit('error', err);  // 触发 error 事件
};

function defaultErrorHandler(err) {
  console.error(err.stack);
}

var checker = new Checker('http://www.tmalxzcsdfl.com/', 'tmall.html');
function noop() {}
