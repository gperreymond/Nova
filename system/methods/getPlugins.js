const path = require('path')
const glob = require('glob-promise')
const YAML = require('yamljs')

const method = (next) => {
  const directoryPages = path.resolve(__dirname, '../../plugins')
  let plugins = []
  glob(directoryPages + '/**/plugin.yml').then(files => {
    files.map(file => {
      let plugin = YAML.load(file)
      switch (plugin.type) {
        case 'router':
          // this.route(plugin.rules)
          break
        default:
      }
    })
    next(null, plugins)
  }).catch(next)
}

module.exports = method
