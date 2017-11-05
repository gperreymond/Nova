const _ = require('lodash')
const uuid = require('uuid')
const path = require('path')
const fse = require('fs-extra')
const Boom = require('boom')
const YAML = require('yamljs')
const async = require('async')
const queryString = require('query-string')

const Promise = require('bluebird')
const Vue = require('vue')
const renderer = require('vue-server-renderer').createRenderer()
const renderToString = Promise.promisify(renderer.renderToString)

const handler = (request, reply) => {
  Vue.config.silent = true
  const pages = request.pre.pages.dataProvider
  // get current page or 404
  let requestName = request.path.substr(1)
  if (requestName === '') requestName = 'home'
  const currentIndex = _.findIndex(pages, function (item) { return item.name === requestName })
  if (currentIndex === -1) return reply(Boom.notFound('Page not found!'))
  let page = pages[currentIndex]
  // get page menus
  page.menus = []
  pages.map(item => {
    page.menus.push({
      uuid: uuid.v4(),
      label: _.capitalize(item.name),
      href: _.toLower(item.name),
      active: item.name === requestName
    })
  })
  // get page content
  const chunk = fse.readFileSync(path.resolve(__dirname, '../../user/pages', page.filepath))
  let content = chunk.toString().split('---')
  page.content = content[2] || content[0]
  const modules = Object.keys(page.modules)
  async.map(modules, (module, next) => {
    const chunkModule = fse.readFileSync(page.modules[module])
    let contentModule = chunkModule.toString().split('---')
    let metadataModule = { type: false }
    if (contentModule[1]) {
      metadataModule = YAML.parse(contentModule[1].toString())
    }
    if (metadataModule['query-string']) {
      metadataModule.qs = queryString.stringify(metadataModule['query-string'])
    }
    page.modules[module] = {
      metadata: metadataModule,
      content: contentModule[2] || contentModule[0]
    }
    let app = new Vue({
      template: fse.readFileSync(path.resolve(__dirname, '../../themes', page.theme, 'templates', metadataModule.type + '.html')).toString(),
      data: page.modules[module].metadata
    })
    renderToString(app, page.modules[module].metadata).then((result) => {
      // replace plugin in the plugin content
      let regexPlugin = new RegExp('\\[plugins:' + metadataModule.type + ']', 'g')
      page.modules[module].content = page.modules[module].content.replace(regexPlugin, result)
      // remplace module in page content
      let regexModule = new RegExp('\\[modules:' + module + ']', 'g')
      page.content = page.content.replace(regexModule, page.modules[module].content)
      next()
    }).catch(next)
  }, (error, result) => {
    if (error) return reply(Boom.boomify(error))
    reply.view('themes/' + page.theme + '/index', {page})
  })
}

module.exports = handler
