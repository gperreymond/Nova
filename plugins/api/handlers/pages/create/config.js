const Joi = require('joi')

module.exports = {
  auth: {
    strategy: 'jwt',
    access: [{
      scope: ['admin']
    }]
  },
  validate: {
    payload: {
      title: Joi.string().min(3).max(50).required(),
      folder: Joi.string().regex(/^[a-z]+$/, 'alpha').required(),
      template: Joi.string().regex(/^[a-z]+$/, 'alpha').required()
    }
  }
}
