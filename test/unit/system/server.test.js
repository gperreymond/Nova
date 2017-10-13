const server = require('../../../system/server')

describe('[unit] server', () => {
  it('should start without error', done => {
    server.run().then(() => {
      server.stop()
      done()
    }).catch(done)
  })
})
