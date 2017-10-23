const chai = require('chai')
const expect = chai.expect

const server = require('../../../system/server')

describe('[unit] server', () => {
  it('should fail start the cache in memory', done => {
    server.startCache().then((result) => {
      done('not good')
    }).catch((error) => {
      expect(error).to.not.equal(null)
      done()
    })
  })
  it('should initialize', done => {
    server.initialize().then(() => {
      done()
    }).catch(done)
  })
  it('should start the cache in memory', done => {
    server.startCache().then((result) => {
      expect(result.isReady).to.equal(true)
      done()
    }).catch(done)
  })
  it('should start', done => {
    server.start().then(() => {
      done()
    }).catch(done)
  })
  it('should stop the cache in memory', done => {
    server.stopCache().then((result) => {
      expect(result.isReady).to.equal(false)
      done()
    }).catch(done)
  })
  it('should stop', done => {
    server.stop()
    done()
  })
})
