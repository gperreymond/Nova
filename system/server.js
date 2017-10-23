const debug = require('debug')('nova:server')

const path = require('path')
const Promise = require('bluebird')
const Hapi = require('hapi')

const Nova = require('./nova')
const Bell = require('bell')
const Inert = require('inert')
const Vision = require('vision')
const AuthJWT2 = require('hapi-auth-jwt2')

const Catbox = require('catbox')
const CatboxMemory = require('catbox-memory')

const config = require('../config')

// Declare internals

const internals = {
  server: false,
  cache: false,
  validateFunc: function (decoded, request, callback) {
    callback(null, true)
  },
  errorFunc: function (errorContext) {
    return errorContext
  }
}

internals.startCache = async function () {
  if (internals.server === false) return Promise.reject(new Error('Server not started'))
  switch (config.cache.type) {
    case 'memory':
      internals.cache = new Catbox.Client(CatboxMemory)
      break
    default:
      return Promise.reject(new Error('Server cache type not allowed'))
  }
  await internals.cache.start()
  internals.server.app.cache = internals.cache
  return {
    isReady: internals.cache.isReady(),
    result: internals.cache
  }
}

internals.stopCache = async function () {
  await internals.cache.stop()
  internals.cache = false
  return {
    isReady: false
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
    // plugins
    internals.server.connection({ port: config.server.port })
    internals.server.register([Inert, Vision, AuthJWT2, Bell], (error) => {
      if (error) return reject(error)
      // auth google
      internals.server.auth.strategy('google', 'bell', {
        provider: 'google',
        password: config.server.auth.google.password,
        isSecure: false,
        clientId: config.server.auth.google.clientId,
        clientSecret: config.server.auth.google.clientSecret,
        location: config.server.auth.google.location
      })
      // auth jwt2
      internals.server.auth.strategy('jwt', 'jwt', {
        key: config.server.auth.jwt2.secret,
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
      internals.server.register([Nova], (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  })
}

module.exports = internals
