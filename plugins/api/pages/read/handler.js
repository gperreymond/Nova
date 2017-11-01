const path = require('path')
const fse = require('fs-extra')
const Boom = require('boom')

const handler = async (request, reply) => {
  const pages = request.pre.pages
  let __ref = pages.__refs[request.params.uuid]
  let page = pages.dataProvider[__ref]
  if (page) {
    const chunk = fse.readFileSync(path.resolve(__dirname, '../../user/pages', page.filepath))
    let content = chunk.toString().split('---')
    page.content = content[2] || content[0]
    reply(page)
  } else {
    reply(Boom.notFound('Page not found!'))
  }
}

module.exports = handler
