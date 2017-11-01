const _ = require('lodash')
const Boom = require('boom')

const handler = (request, reply) => {
  const pages = request.pre.pages.dataProvider
  // get current page or 404
  let requestName = request.path.substr(1)
  if (requestName === '') requestName = 'home'
  const currentIndex = _.findIndex(pages, function (item) { return item.name === requestName })
  if (currentIndex === -1) return reply(Boom.notFound('Page not found!'))
  let page = pages[currentIndex]
  page.content = ''
  /* const chunk = fse.readFileSync(path.resolve(__dirname, '../../user/pages', page.filepath))
  let content = chunk.toString().split('---')
  page.content = content[2] || content[0]
  // is there any modules ?
  if (page.metadata && page.metadata.modules) {
    page.metadata.modules.map(module => {
      let chunkModule = fse.readFileSync(path.resolve(__dirname, '../../user/pages', page.filepath, '../modules', module.path + '.md'))
      let contentModule = chunkModule.toString().split('---')
      const regex = /\[modules:showcase_youtube]/g
      page.content = page.content.replace(regex, contentModule[2] || contentModule[0])
    })
  } */
  // the reply
  reply.view('themes/' + page.theme + '/index', page)
}

module.exports = handler
