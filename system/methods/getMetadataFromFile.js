const fse = require('fs-extra')
const YAML = require('yamljs')

const method = (filepath, next) => {
  let chunk = fse.readFileSync(filepath)
  let metadata = chunk.toString().split('---')
  if (metadata[1]) {
    metadata = YAML.parse(metadata[1].toString())
    next(null, metadata)
  } else {
    next(new Error('no metadata found'))
  }
}

module.exports = method
