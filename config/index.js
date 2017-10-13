const nconf = require('nconf')

nconf.argv().env().file({ file: 'nconf.json' })

module.exports = {
  server: {
    port: nconf.get('NOVA_SERVER_PORT') || 8000
  }
}
