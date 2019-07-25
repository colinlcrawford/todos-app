const Joi = require('@hapi/joi')

const createAuthTokenValidators = {
  payload: {
    email: Joi.string().max(100),
    password: Joi.string().max(100)
  }
}

module.exports = {
  createAuthTokenValidators
}
