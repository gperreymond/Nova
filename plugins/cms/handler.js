const _ = require('lodash')
const path = require('path')
const fse = require('fs-extra')
const Boom = require('boom')
const YAML = require('yamljs')

const handler = (request, reply) => {
  const pages = request.pre.pages.dataProvider
  // get current page or 404
  let requestName = request.path.substr(1)
  if (requestName === '') requestName = 'home'
  const currentIndex = _.findIndex(pages, function (item) { return item.name === requestName })
  if (currentIndex === -1) return reply(Boom.notFound('Page not found!'))
  let page = pages[currentIndex]
  // get page content
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
    // remplace module in page content
    const regex = new RegExp('\\[modules:' + module + ']', 'g')
    page.content = page.content.replace(regex, page.modules[module].content)
  })
  // the reply
  reply.view('themes/' + page.theme + '/index', page)
}

module.exports = handler
