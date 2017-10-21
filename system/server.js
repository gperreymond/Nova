const debug = require('debug')('nova:server')

const path = require('path')
const Promise = require('bluebird')
const Hapi = require('hapi')

const Nova = require('./nova')
const Inert = require('inert')
const Vision = require('vision')
const AuthJWT2 = require('hapi-auth-jwt2')

const config = require('../config')

require('babel-core/register')({
  plugins: ['transform-react-jsx']
})

// Declare internals

const internals = {
  server: false,
  validateFunc: function (decoded, request, callback) {
    callback(null, true)
  },
  errorFunc: function (errorContext) {
    return errorContext
  }
}

internals.stop = function () {
  internals.server.stop()
}

internals.start = function () {
  return new Promise((resolve, reject) => {
    debug('start')
    internals.server.start((error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}

internals.initialize = function () {
  return new Promise((resolve, reject) => {
    debug('initialize')
    internals.server = new Hapi.Server()
    internals.server.connection({ port: config.server.port })
    internals.server.register([Inert, Vision, AuthJWT2, Nova], (error) => {
      if (error) return reject(error)
      // jwt
      internals.server.auth.strategy('jwt', 'jwt', {
        key: config.server.auth.secret,
        validateFunc: internals.validateFunc,
        verifyOptions: { algorithms: [ 'HS256' ] },
        errorFunc: internals.errorFunc
      })
      // react views
      internals.server.views({
        engines: { jsx: require('hapi-react-views') },
        path: path.resolve(__dirname, '..'),
        compileOptions: {
          renderMethod: 'renderToString'
        }
      })
      // methods
      internals.server.method({ name: 'getPages', method: require('./methods/getPages'), options: {bind: internals.server} })
      internals.server.method({ name: 'getPlugins', method: require('./methods/getPlugins'), options: {bind: internals.server} })
      // route: themes
      internals.server.route({ method: 'GET', path: '/themes/{p*}', handler: { directory: { path: path.resolve(__dirname, '../themes') } } })
      resolve()
    })
  })
}

module.exports = internals
