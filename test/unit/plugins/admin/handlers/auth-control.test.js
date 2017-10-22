const chai = require('chai')
const expect = chai.expect

const handler = require('../../../../../plugins/admin/server/handlers/auth-control')

const requestNoRememberMe = {
  path: '/',
  state: {}
}

let requestWithRememberMe = {
  path: '/',
  state: {},
  server: {
    app: {
      cache: {
        get: function (key) {
          if (key.id === 'urn:error') return null
          return {id: 'this is a good id'}
        }
      }
    }
  }
}

describe('[unit] plugin admin/handlers/auth-control', () => {
  it('should fail because no rememberMe', done => {
    handler(requestNoRememberMe, (error) => {
      expect(error.isBoom).to.equal(true)
      done()
    })
  })
  it('should fail because rememberMe is not in cache', done => {
    requestWithRememberMe.state.rememberMePluginAdmin = 'urn:error'
    handler(requestWithRememberMe, (error) => {
      expect(error.isBoom).to.equal(true)
      done()
    })
  })
  it('should fail because rememberMe is not in cache', done => {
    requestWithRememberMe.state.rememberMePluginAdmin = 'urn:valid'
    handler(requestWithRememberMe, (result) => {
      expect(result.account.id).to.equal('this is a good id')
      done()
    })
  })
})
