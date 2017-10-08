const path = require('path')
const glob = require('glob-promise')

const method = (route, next) => {
  const directoryPages = path.resolve(__dirname, '../../pages')
  let pages = {}
  glob(directoryPages + '/**/*.md').then(files => {
    files.map(file => {
      let params = path.dirname(file).split(directoryPages)[1].split('.')
      pages[params[1]] = {
        number: params[0].substr(1),
        name: params[1],
        filename: path.basename(file),
        filepath: file
      }
    })
    next(null, pages)
  }).catch(next)
}

module.exports = method
