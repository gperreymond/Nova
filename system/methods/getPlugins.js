const path = require('path')
const glob = require('glob-promise')
const YAML = require('yamljs')

const method = function (api, next) {
  const directoryPages = path.resolve(__dirname, '../../plugins')
  let plugins = []
  glob(directoryPages + '/**/plugin.yml').then(files => {
    files.map(file => {
      const pluginPath = path.dirname(file)
      let plugin = YAML.load(file)
      plugins.push(plugin)
      if (api === false) {
        switch (plugin.type) {
          case 'router':
            plugin.rules.handler = require(path.resolve(pluginPath, plugin.rules.handler))
            this.route(plugin.rules)
            break
          default:
        }
      }
    })
    next(null, plugins)
  }).catch(next)
}

module.exports = method
