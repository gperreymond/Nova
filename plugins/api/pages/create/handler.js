const path = require('path')
const fse = require('fs-extra')
const uuid = require('uuid')

const config = require('../../../../config')
const list = require('../list')

const handler = async (request, reply) => {
  const directoryPages = path.resolve(config.settings.userpath, 'pages')
  const filename = request.payload.folder
  const filepath = path.resolve(directoryPages, '01.' + filename, request.payload.template + '.md')
  fse.ensureFileSync(filepath)
  const stream = fse.createWriteStream(filepath)
  stream.write('---\n')
  stream.write('uuid: ' + uuid.v4() + '\n')
  stream.write('title: ' + request.payload.title + '\n')
  stream.write('publish: true\n')
  stream.write('---\n')
  stream.write('# Page')
  stream.end()
  list(request, reply)
}

module.exports = handler
