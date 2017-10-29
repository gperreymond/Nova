const path = require('path')
const fse = require('fs-extra')
const uuid = require('uuid')

const list = require('./list')

const handler = async (request, reply) => {
  const filepath = path.resolve(__dirname, '../../../../user/pages', '00-' + uuid.v4(), 'default.md')
  fse.ensureFileSync(filepath)
  const stream = fse.createWriteStream(filepath)
  stream.write('# Page')
  stream.end()
  list(request, reply)
}

module.exports = handler
