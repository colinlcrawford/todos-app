const Joi = require('@hapi/joi')

const loginValidators = {
  payload: {
    email: Joi.string().max(100),
    password: Joi.string().max(100)
  }
}

module.exports = {
  loginValidators
}
