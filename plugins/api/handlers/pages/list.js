const path = require('path')
const async = require('async')
const YAML = require('yamljs')
const fse = require('fs-extra')
const Boom = require('boom')

const handler = (request, reply) => {
  request.server.methods.getPages((error, pages) => {
    if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
    if (pages.length === 0) {
      return reply({
        type: 'pages',
        count: pages.length,
        dataProvider: []
      })
    }
    async.map(pages, function (page, next) {
      let chunk = fse.readFileSync(path.resolve(__dirname, '../../user/pages', page.filepath))
      page.metadata = {}
      let metadata = chunk.toString().split('---')
      if (metadata[1]) {
        page.metadata = YAML.parse(metadata[1].toString())
        if (page.metadata.modules) {
          page.metadata.modules.map((item) => {
            let filepathModule = path.resolve(__dirname, '../../user/pages', page.filepath, '../modules', item.path + '.md')
            let contentModule = fse.readFileSync(filepathModule)
            let metadataModule = contentModule.toString().split('---')
            if (metadataModule[1]) {
              page[item.path] = {
                type: item.type,
                filepath: filepathModule,
                metadata: YAML.parse(metadataModule[1].toString())
              }
            }
          })
          next(null, page)
        } else {
          next(null, page)
        }
      } else {
        page.metadata.title = ''
        page.metadata.publish = true
        next(null, page)
      }
    }, (error, result) => {
      if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
      reply({
        type: 'pages',
        count: result.length,
        dataProvider: result
      })
    })
  })
}

module.exports = handler
