const server = require('../../../system/server')

describe('[unit] server', () => {
  it('should start without error', done => {
    server.initialize().then(() => {
      return server.start().then(() => {
        server.stop()
        done()
      })
    }).catch(done)
  })
})
