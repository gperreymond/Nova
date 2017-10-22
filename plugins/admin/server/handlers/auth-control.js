const Boom = require('boom')

const handler = async function (request, reply) {
  const userURN = request.state.rememberMePluginAdmin || 'none'
  // no cookie
  if (userURN === 'none') return reply(Boom.notFound('User not found!'))
  const key = { id: userURN, segment: 'account' }
  const account = await request.server.app.cache.get(key)
  // no cache
  if (account === null) return reply(Boom.notFound('User not found!'))
  reply({account})
}

module.exports = handler
