const Joi = require('joi')

const config = {
  pre: [
    { method: require('../list'), assign: 'pages' }
  ],
  validate: {
    params: {
      uuid: Joi.string().uuid()
    }
  }
}

module.exports = config
