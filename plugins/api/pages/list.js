const path = require('path')
const async = require('async')
const Boom = require('boom')
const glob = require('glob-promise')
const Promise = require('bluebird')

const handler = (request, reply) => {
  const getPages = Promise.promisify(request.server.methods.getPages)
  const getMetadataFromFile = Promise.promisify(request.server.methods.getMetadataFromFile)
  getPages().then(pages => {
    let __refs = {}
    if (pages.length === 0) {
      return reply({
        type: 'pages',
        count: pages.length,
        dataProvider: []
      })
    }
    let __ref = 0
    async.mapLimit(pages, 10, function (page, next) {
      // modules
      let dirpath = path.resolve(__dirname, '../../user/pages', page.filepath, '../modules')
      page.modules = {}
      glob(dirpath + '/*.md').then(modules => {
        modules.map(module => {
          page.modules[path.basename(module, '.md')] = module
        })
        // metadata
        let filepath = path.resolve(__dirname, '../../user/pages', page.filepath)
        return getMetadataFromFile(filepath).then(result => {
          page.metadata = result
          __refs[page.metadata.uuid] = __ref
          __ref++
          next(null, page)
        })
      }).catch(next)
    }, (error, result) => {
      if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
      reply({
        type: 'pages',
        count: pages.length,
        __refs,
        dataProvider: pages
      })
    })
  }).catch(error => {
    reply(Boom.boomify(error, { statusCode: 400 }))
  })
}

module.exports = handler
