/*global it: true, describe: true, beforeEach: true */
var expect = require('chai').expect
  , Mocket = require('../')

describe('Mockets', function () {
  describe('pair', function () {
    var pair
    beforeEach(function () {
      pair = Mocket.pair()
    })

    it('should pass messages one way', function (done) {
      var sent = 'asdfjl123##.'
      pair[0].on('data', function (got) {
        expect(got).to.eql(sent)
        done()
      })
      pair[1].write(sent)
    })

    it('should pass messages the other way', function (done) {
      var sent = 'asdfjl123##.'
      pair[1].on('data', function (got) {
        expect(got).to.eql(sent)
        done()
      })
      pair[0].write(sent)
    })
  })
})

