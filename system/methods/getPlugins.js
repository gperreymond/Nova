const path = require('path')
const glob = require('glob-promise')
const YAML = require('yamljs')
const _ = require('lodash')

const method = function (api, next) {
  const directoryPages = path.resolve(__dirname, '../../plugins')
  let plugins = []
  glob(directoryPages + '/**/plugin.yml').then(files => {
    files.map(file => {
      const pluginPath = path.dirname(file)
      let plugin = YAML.load(file)
      plugins.push(plugin)
      if (api === false) {
        _.map(plugin.rules, rule => {
          switch (rule.type) {
            case 'route':
              delete rule.type
              rule.handler = require(path.resolve(pluginPath, rule.handler))
              console.log(rule)
              return this.route(rule)
            default:
          }
        })
      }
    })
    next(null, plugins)
  }).catch(next)
}

module.exports = method
