const path = require('path')
const async = require('async')
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
      const stream = fse.createReadStream(path.resolve(__dirname, '../../user/pages', page.filepath))
      stream.on('data', (chunk) => {
        stream.close()
        page.metadata = {}
        let metadata = chunk.toString().split('---')
        if (metadata[1]) {
          let data = metadata[1].split('\n')
          data.map(param => {
            let props = param.split(':')
            if (props.length === 2) {
              try {
                page.metadata[props[0]] = JSON.parse(props[1].trim())
              } catch (e) {
                page.metadata[props[0]] = props[1].trim()
              }
            }
          })
        } else {
          page.metadata.title = ''
          page.metadata.publish = true
        }
        next(null, page)
      })
    }, (error, result) => {
      if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
      reply({
        type: 'pages',
        count: pages.length,
        dataProvider: result
      })
    })
  })
}

module.exports = handler
