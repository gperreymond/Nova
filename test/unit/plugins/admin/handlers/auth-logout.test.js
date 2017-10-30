const handler = require('../../../../../plugins/admin/server/handlers/auth-logout')

const requestSuccess = {
  path: '/'
}

const replySuccess = () => {
  this.unstate = () => { return this }
  return this
}

describe('[unit] plugin admin/handlers/logout', () => {
  it('should success', done => {
    handler(requestSuccess, replySuccess)
    done()
  })
})
