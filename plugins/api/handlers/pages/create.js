const path = require('path')
const fse = require('fs-extra')
const uuid = require('uuid')

const config = require('../../../../config')
const list = require('./list')

const handler = async (request, reply) => {
  const directoryPages = path.resolve(config.settings.userpath, 'pages')
  const filename = uuid.v4().split('-').join('')
  const filepath = path.resolve(directoryPages, '00-' + filename, 'default.md')
  fse.ensureFileSync(filepath)
  const stream = fse.createWriteStream(filepath)
  stream.write('# Page')
  stream.end()
  list(request, reply)
}

module.exports = handler
