
var EventEmitter = require('events').EventEmitter
  , util = require('util')

function Mocket() {
  EventEmitter.call(this)
}

util.inherits(Mocket, EventEmitter)

Mocket.prototype.write = function (data) {
  this.emit('send:data', data)
}

Mocket.prototype.pair = function (other) {
  var self = this
  other.on('send:data', function (data) {
    self.emit('data', data)
  })
  this.on('send:data', function (data) {
    other.emit('data', data)
  })
}

Mocket.pair = function () {
  var m1 = new Mocket()
    , m2 = new Mocket()
  m1.pair(m2)
  return [m1, m2]
}

module.exports = Mocket
