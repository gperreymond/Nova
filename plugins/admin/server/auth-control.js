const Boom = require('boom')

const handler = (request, reply) => {
  const userURN = request.state.rememberMePluginAdmin || 'none'
  if (userURN === 'none') return reply(Boom.notFound('User not found!'))
  console.log(userURN)
  reply({account: true})
}

module.exports = handler
