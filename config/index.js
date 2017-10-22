const nconf = require('nconf')

nconf.argv().env().file({ file: 'nconf.json' })

module.exports = {
  server: {
    port: nconf.get('NOVA_SERVER_PORT') || 8000,
    auth: {
      jwt2: {
        secret: 'Xc45GvnvB4NSvTQ5BaAz5DHKM9DzEDknxufBTa3wNZnEVJaeRV'
      },
      google: {
        clientId: '10370308640-g91r2ga04jig3j9ajisk4damedt9beah.apps.googleusercontent.com',
        clientSecret: 'yAB0jaBfQXkogGcor9SXAVnZ',
        password: 'yjZt6aLnMt4cRSGXT6HAQ5FDbSkAMVsVNrC6w4mfSjMcKPxgJS',
        location: 'http://localhost:8000'
      }
    }
  },
  plugins: {
    admin: {
      email: 'gperreymond@gmail.com'
    }
  }
}
