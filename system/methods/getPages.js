const path = require('path')
const glob = require('glob-promise')

const config = require('../../config')

const method = (next) => {
  const directoryPages = path.resolve(config.settings.userpath, 'pages')
  let pages = []
  glob(directoryPages + '/**/*.md').then(files => {
    files.map(file => {
      let params = path.dirname(file).split(directoryPages)[1].split('.')
      pages.push({
        number: params[0].substr(1),
        name: params[1],
        theme: path.basename(file, '.md'),
        filepath: file
      })
    })
    next(null, pages)
  }).catch(next)
}

module.exports = method
