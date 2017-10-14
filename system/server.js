const path = require('path')
const Promise = require('bluebird')
const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')

const config = require('../config')

require('babel-core/register')({
  plugins: ['transform-react-jsx']
})

// Declare internals

const internals = {
  server: false
}

internals.stop = function () {
  internals.server.stop()
}

internals.start = function () {
  return new Promise((resolve, reject) => {
    internals.server.start((error) => {
      if (error) return reject(error)
      resolve()
    })
  })
}

internals.initialize = function () {
  return new Promise((resolve, reject) => {
    internals.server = new Hapi.Server()
    internals.server.connection({ port: config.server.port })
    internals.server.register([Inert, Vision], (error) => {
      if (error) return reject(error)
      internals.server.views({
        engines: { jsx: require('hapi-react-views') },
        path: path.resolve(__dirname, '..')
      })
      // methods
      internals.server.method({ name: 'getPages', method: require('./methods/getPages'), options: {bind: internals.server} })
      internals.server.method({ name: 'getPlugins', method: require('./methods/getPlugins'), options: {bind: internals.server} })
      // route: themes
      internals.server.route({ method: 'GET', path: '/themes/{p*}', handler: { directory: { path: path.resolve(__dirname, '../themes') } } })
      // route: cms
      internals.server.route({
        method: 'GET',
        path: '/{p*}',
        config: {
          pre: [
            { method: require('../plugins/api/handlers/pages/list'), assign: 'pages' }
          ],
          handler: require('./handlers/rooter')
        }
      })
      // load plugins
      internals.server.methods.getPlugins(false, (error) => {
        if (error) return reject(error)
        resolve()
      })
    })
  })
}

module.exports = internals
