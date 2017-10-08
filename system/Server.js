const path = require('path')

const Hapi = require('hapi')
const Inert = require('inert')
const Vision = require('vision')

require('babel-core/register')({
  plugins: ['transform-react-jsx']
})

// Declare internals

const internals = {}

internals.run = function () {
  const server = new Hapi.Server()
  server.connection({ port: 8000 })
  server.register([Inert, Vision], (err) => {
    if (err) {
      throw err
    }
    server.views({
      engines: { jsx: require('hapi-react-views') },
      path: path.resolve(__dirname, '../themes'),
      compileOptions: {
        spretty: true,
        layoutPath: path.resolve(__dirname, '../themes'),
        layout: 'layout'
      }
    })
    server.route({ method: 'GET', path: '/themes/{param*}', handler: { directory: { path: path.resolve(__dirname, '../themes') } } })
    server.route({ method: 'GET', path: '/{p*}', handler: require('./handlers/Root') })
    server.start((err) => {
      if (err) {
        throw err
      }
      console.log('Server is listening at ' + server.info.uri)
    })
  })
}

module.exports = internals
