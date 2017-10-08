const path = require('path')

const Boom = require('boom')
const fse = require('fs-extra')
const YAML = require('yamljs')

const handler = (request, reply) => {
  // get the page to load
  const pages = YAML.load(path.resolve(__dirname, '../../pages/data.yml'))
  let page = ''
  request.path === '/' ? page = '/home' : page = request.path
  // 404 or render the page
  if (!pages[page]) return reply(Boom.notFound('Page not found!'))
  // load the content in the md file
  const stream = fse.createReadStream(path.resolve(__dirname, '../../pages', pages[page].file))
  stream.on('data', (chunk) => {
    stream.close()
    reply.view('default/index', {
      title: page,
      content: chunk.toString()
    })
  })
}

module.exports = handler
