const uuid = require('uuid')

const config = require('../../../config')

const handler = (request, reply) => {
  if (!request.auth.isAuthenticated) {
    return reply('Authentication failed due to: ' + request.auth.error.message)
  }
  console.log(request.auth.credentials)
  if (request.auth.credentials.profile.email !== config.plugins.admin.email) {
    return reply('Authentication failed due to: email is not authorize')
  }
  const account = {
    id: uuid.v4(),
    provider: request.auth.credentials.provider,
    email: request.auth.credentials.profile.email
  }
  const userURN = 'urn:plugin:admin:user:' + account.id
  reply().state('rememberMePluginAdmin', userURN, { ttl: 24 * 60 * 60 * 1000, isSecure: false, isHttpOnly: false }).redirect('/admin')
}

module.exports = handler
