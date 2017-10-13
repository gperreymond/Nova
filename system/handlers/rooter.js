const path = require('path')
const fse = require('fs-extra')
const _ = require('lodash')
const Boom = require('boom')

const handler = (request, reply) => {
  const pages = request.pre.pages
  // get current page content
  let requestName = request.path.substr(1)
  if (requestName === '') requestName = 'home'
  const currentIndex = _.findIndex(pages, function (item) { return item.name === requestName })
  if (currentIndex === -1) return reply(Boom.notFound('Page not found!'))
  let page = pages[currentIndex]
  const stream = fse.createReadStream(path.resolve(__dirname, '../../user/pages', page.filepath))
  stream.on('data', (chunk) => {
    stream.close()
    let content = chunk.toString().split('---')
    page.content = content[2] || content[0]
    reply.view(page.theme + '/index', page)
  })
}

module.exports = handler
