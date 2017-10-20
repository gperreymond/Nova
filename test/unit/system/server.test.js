const server = require('../../../system/server')

describe('[unit] server', () => {
  it('should initialize', done => {
    server.initialize().then(() => {
      done()
    }).catch(done)
  })
  it('should start', done => {
    server.start().then(() => {
      done()
    }).catch(done)
  })
  it('should stop', done => {
    server.stop()
    done()
  })
})
