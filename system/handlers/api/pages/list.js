const path = require('path')
const async = require('async')
const fse = require('fs-extra')
const Boom = require('boom')

const handler = (request, reply) => {
  request.server.methods.getPages(request.path, (error, pages) => {
    if (error) return reply(Boom.boomify(error, { statusCode: 400 }))
    async.map(pages, function (page, next) {
      const stream = fse.createReadStream(path.resolve(__dirname, '../../pages', page.filepath))
      stream.on('data', (chunk) => {
        stream.close()
        page.metadata = {}
        let data = chunk.toString().split('---')[1].split('\n')
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
