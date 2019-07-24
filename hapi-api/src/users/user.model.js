const Joi = require('@hapi/joi')

const userSchema = Joi.object().keys({
  id: Joi.string(),
  email: Joi.string().min(1).max(50).required(),
  passwordDigest: Joi.string().max(500).required()
})

const validateUser = todo => Joi.validate(todo, userSchema)

const createUser = todo => {
  return validateUser(todo)
}

module.exports = {
  validateUser,
  userSchema,
  createUser
}
