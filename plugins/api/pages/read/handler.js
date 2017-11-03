const path = require('path')
const fse = require('fs-extra')
const Boom = require('boom')
const YAML = require('yamljs')

const handler = async (request, reply) => {
  const pages = request.pre.pages
  let __ref = pages.__refs[request.params.uuid]
  let page = pages.dataProvider[__ref]
  if (page) {
    const chunk = fse.readFileSync(path.resolve(__dirname, '../../user/pages', page.filepath))
    let content = chunk.toString().split('---')
    page.content = content[2] || content[0]
    Object.keys(page.modules).map(module => {
      const chunkModule = fse.readFileSync(page.modules[module])
      let contentModule = chunkModule.toString().split('---')
      let metadataModule = { type: false }
      if (contentModule[1]) {
        metadataModule = YAML.parse(contentModule[1].toString())
      }
      page.modules[module] = {
        metadata: metadataModule,
        content: contentModule[2] || contentModule[0]
      }
    })
    reply(page)
  } else {
    reply(Boom.notFound('Page not found!'))
  }
}

module.exports = handler
