const Boom = require('boom')

const handler = (request, reply) => {
  request.server.methods.getPages(request.path, (error, pages) => {
    if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
    reply({
      type: 'pages',
      count: Object.keys(pages).length,
      dataProvider: pages
    })
  })
}

module.exports = handler
