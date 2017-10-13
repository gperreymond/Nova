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

internals.run = function () {
  return new Promise((resolve, reject) => {
    internals.server = new Hapi.Server()
    internals.server.connection({ port: config.server.port })
    internals.server.register([Inert, Vision], (error) => {
      if (error) return reject(error)
      internals.server.views({
        engines: { jsx: require('hapi-react-views') },
        path: path.resolve(__dirname, '../themes'),
        compileOptions: {
          spretty: true,
          layoutPath: path.resolve(__dirname, '../themes'),
          layout: 'layout'
        }
      })
      internals.server.method({ name: 'getPages', method: require('./methods/getPages'), options: {} })
      internals.server.method({ name: 'getPlugins', method: require('./methods/getPlugins'), options: {} })
      internals.server.route({ method: 'GET', path: '/themes/{param*}', handler: { directory: { path: path.resolve(__dirname, '../themes') } } })
      internals.server.route({ method: 'GET', path: '/api/pages', handler: require('./handlers/api/pages/list') })
      internals.server.route({
        method: 'GET',
        path: '/{param*}',
        config: {
          pre: [
            { method: require('./handlers/api/pages/list'), assign: 'pages' }
          ],
          handler: require('./handlers/rooter')
        }
      })
      // analyse plugins
      internals.server.methods.getPlugins((error, result) => {
        if (error) return reject(error)
        internals.server.start((error) => {
          if (error) return reject(error)
          resolve()
        })
      })
    })
  })
}

module.exports = internals
