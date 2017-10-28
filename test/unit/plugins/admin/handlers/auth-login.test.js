const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../../plugins/admin/server/handlers/auth-login')

const requestNotAuthenticate = {
  path: '/',
  auth: {
    error: {
      message: 'error'
    }
  }
}
const requestBadEmail = {
  path: '/',
  auth: {
    isAuthenticated: true,
    credentials: { profile: { email: 'test@gmail.com' } }
  }
}
const requestSuccess = {
  path: '/',
  auth: {
    isAuthenticated: true,
    credentials: { provider: 'google', profile: { email: 'gperreymond@gmail.com' } }
  },
  server: {
    app: { cache: { set: function () { return {} } } }
  }
}

const replySuccess = () => {
  this.state = () => { return this }
  this.redirect = () => { return this }
  return this
}

describe('[unit] plugin admin/handlers/login', () => {
  it('should fail because no authenticate', done => {
    handler(requestNotAuthenticate, (error) => {
      expect(error.isBoom).to.equal(true)
      done()
    })
  })
  it('should fail because email is not good', done => {
    handler(requestBadEmail, (error) => {
      expect(error.isBoom).to.equal(true)
      done()
    })
  })
  it('should success', done => {
    handler(requestSuccess, replySuccess)
    done()
  })
})
