const path = require('path')
const Boom = require('boom')
const fse = require('fs-extra')

const handler = (request, reply) => {
  // get authorize pages to load
  request.server.methods.getPages(request.path, (error, pages) => {
    if (error) return reply(Boom.notFound('Page not found!'))
    // get current page content
    let requestLabel = request.path.substr(1)
    if (requestLabel === '') requestLabel = 'home'
    if (!pages[requestLabel]) return reply(Boom.notFound('Page not found!'))
    let page = pages[requestLabel]
    const stream = fse.createReadStream(path.resolve(__dirname, '../../pages', page.filepath))
    stream.on('data', (chunk) => {
      stream.close()
      page.content = chunk.toString()
      reply.view('default/index', page)
    })
  })
}

module.exports = handler
