const path = require('path')
const fse = require('fs-extra')
const _ = require('lodash')
const Boom = require('boom')

const apiPagesList = require('./api/pages/list')

const handler = (request, reply) => {
  // get authorize pages to load
  apiPagesList(request, (result) => {
    if (result.isBoom) return reply(result)
    const pages = result.dataProvider
    // get current page content
    let requestName = request.path.substr(1)
    if (requestName === '') requestName = 'home'
    const currentIndex = _.findIndex(pages, function (item) { return item.name === requestName })
    if (currentIndex === -1) return reply(Boom.notFound('Page not found!'))
    let page = pages[currentIndex]
    const stream = fse.createReadStream(path.resolve(__dirname, '../../pages', page.filepath))
    stream.on('data', (chunk) => {
      stream.close()
      page.content = chunk.toString().split('---')[2]
      reply.view(page.theme + '/index', page)
    })
  })
}

module.exports = handler
